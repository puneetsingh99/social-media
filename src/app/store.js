import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
