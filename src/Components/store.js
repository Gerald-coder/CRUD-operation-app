import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../Features/posts/PostSlice";
import UserReducer from "../Features/users/UserSlice";

export const store = configureStore({
  reducer: {
    posts: PostReducer,
    users: UserReducer,
  },
});
// console.log("main store is", store);
