import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export default loaderSlice;
