import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/generalSlice";
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
  },
});
