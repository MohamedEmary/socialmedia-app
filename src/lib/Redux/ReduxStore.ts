import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const reduxStore = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default reduxStore;
