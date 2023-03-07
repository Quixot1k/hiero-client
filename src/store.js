import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/generalSlice";
import customerReducer from "./features/customerSlice";

export default configureStore({
  reducer: {
    general: generalReducer,
    customer: customerReducer,
  },
});
