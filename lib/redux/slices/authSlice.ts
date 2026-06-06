import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, getCookie, eraseCookie } from "@/lib/cookies";

export interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  isProfileFetched?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        setCookie("findea_token", action.payload.token, 7); // expires in 7 days
        setCookie("findea_refresh_token", action.payload.refreshToken, 30); // expires in 30 days
      }
    },
    setProfile: (state, action: PayloadAction<User>) => {
      state.user = {
        ...action.payload,
        isProfileFetched: true,
      };
    },
    setProfileInfo: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string; phone: string }>
    ) => {
      if (!state.user) {
        state.user = {
          id: "",
          email: "",
          name: "",
        };
      }
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.phone = action.payload.phone;
      state.user.isProfileFetched = true;
      state.user.name = `${action.payload.firstName} ${action.payload.lastName}`.trim();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        eraseCookie("findea_token");
        eraseCookie("findea_refresh_token");
      }
    },
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = getCookie("findea_token");
        const refreshToken = getCookie("findea_refresh_token");
        if (token) {
          state.token = token;
          state.refreshToken = refreshToken;
          state.isAuthenticated = true;
        }
      }
      state.isHydrated = true;
    },
  },
});

export const { setCredentials, setProfile, setProfileInfo, logout, hydrateAuth } =
  authSlice.actions;
export default authSlice.reducer;
