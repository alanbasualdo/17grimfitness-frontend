import { createSlice } from "@reduxjs/toolkit";

export const userClassesSlice = createSlice({
  name: "userClasses",
  initialState: {
    userClasses: [],
    loadingUserClasses: false,
  },
  reducers: {
    setUserClasses: (state, action) => {
      state.userClasses = action.payload;
    },
    setLoadingUserClasses: (state, action) => {
      state.loadingUserClasses = action.payload;
    },
  },
});

export const { setUserClasses, setLoadingUserClasses } =
  userClassesSlice.actions;

export default userClassesSlice;
