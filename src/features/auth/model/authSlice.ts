import type { GenderType } from "@/shared/types/api-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone?: string;
  country?: string;
  gender?: GenderType;
  avatarUrl?: string | null;
  birthDate?: string; // <-- добавляем это поле
}
export interface AuthState {
  token: string;
  user: User | null;
}

const tokenFromStorage = localStorage.getItem("token") || "";
const userFromStorage = localStorage.getItem("user");
const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;

const initialState: AuthState = {
  token: tokenFromStorage,
  user: parsedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    clearCredentials: (state) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
