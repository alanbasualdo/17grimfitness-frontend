import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loadingUsers: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoadingUsers: (state, action) => {
      state.loadingUsers = action.payload;
    },
  },
});

export const { setUsers, setLoadingUsers } = usersSlice.actions;

export default usersSlice;
