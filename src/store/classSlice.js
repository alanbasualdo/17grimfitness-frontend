import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "class",
  initialState: {
    newClass: null,
    classes: [],
  },
  reducers: {
    addClass: (state, action) => {
      state.newClass = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

export const { addClass, setClasses } = classSlice.actions;

export default classSlice;
