import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ access_token: string }>) => {
      state.accessToken = action.payload.access_token;
      localStorage.setItem("accessToken", action.payload.access_token);
    },
    logout: (state) => {
      state.accessToken = "";
      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
