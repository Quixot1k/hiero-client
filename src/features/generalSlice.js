import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "customer",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    roleChanged: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { roleChanged } = generalSlice.actions;

export default generalSlice.reducer;
