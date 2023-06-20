import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "client",
  loggedIn: false,
  message: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    roleChanged: (state, action) => {
      state.role = action.payload;
    },
    loggedInChanged: (state, action) => {
      state.loggedIn = action.payload;
    },
    messageChanged: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { roleChanged, MessageChanged, loggedInChanged } =
  generalSlice.actions;

export default generalSlice.reducer;
