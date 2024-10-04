import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PostsSlice from "./PostsSlice";

const reduxStore = configureStore({
  reducer: {
    auth: AuthSlice,
    posts: PostsSlice,
  },
});

export default reduxStore;
