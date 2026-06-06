import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setCredentials } from "../slices/authSlice";
import { getCookie } from "@/lib/cookies";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://209.74.71.27:4000/api",
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from state first
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      // Fallback to cookie if state is not hydrated yet
      const storedToken = getCookie("findea_token");
      if (storedToken) {
        headers.set("authorization", `Bearer ${storedToken}`);
      }
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Access token expired, try to get a new one using refresh token
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken || getCookie("findea_refresh_token");

    if (refreshToken) {
      try {
        // Send a post request to auth/refresh
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const data = refreshResult.data as {
            accessToken: string;
            refreshToken: string;
            user: {
              id: string;
              email: string;
              role: string;
              firstName?: string;
              lastName?: string;
            };
          };

          // Dispatch setCredentials to save the new tokens and user info
          api.dispatch(
            setCredentials({
              user: {
                id: data.user.id,
                email: data.user.email,
                name:
                  `${data.user.firstName || ""} ${
                    data.user.lastName || ""
                  }`.trim() || data.user.email,
              },
              token: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );

          // Retry the original query with the new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token failed/invalid, logout
          api.dispatch(logout());
        }
      } catch (err) {
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Category", "Cart", "User", "Order", "Wishlist"],
  endpoints: () => ({}),
});
