// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-auth",
    user: null,
    token: "",
    success: false,
    errorMessage: undefined,
    loadingUser: false,
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.status = "auth";
      state.user = payload.user;
      state.token = payload.token;
      state.success = payload.success;
      state.errorMessage = undefined;
    },
    setChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.token = "";
      state.success = false;
      state.errorMessage = undefined;
    },
    setLogout: (state, { payload }) => {
      state.status = "not-auth";
      state.user = null;
      state.token = "";
      state.success = false;
      state.errorMessage = payload;
    },
    setLoadingUser: (state, { payload }) => {
      state.loadingUser = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  setLogin,
  setChecking,
  setLoadingUser,
  setLogout,
  clearErrorMessage,
} = authSlice.actions;

export default authSlice;
