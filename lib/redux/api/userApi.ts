import { baseApi } from "./baseApi";

export interface UserProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  addresses?: any[];
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserProfileResponse, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    updateMe: builder.mutation<
      UserProfileResponse,
      { firstName: string; lastName: string; phone: string }
    >({
      query: (body) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/users/me/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} = userApi;
