import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import classSlice from "./classSlice";
import loaderSlice from "./loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    class: classSlice.reducer,
    loader: loaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
