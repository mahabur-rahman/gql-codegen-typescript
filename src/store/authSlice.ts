import { createSlice } from "@reduxjs/toolkit";
import { User } from "../graphql/__generated__/graphql";

export interface AuthState {
  accessToken: string;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = "";
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
