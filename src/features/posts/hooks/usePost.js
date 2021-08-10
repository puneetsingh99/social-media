import React, { useReducer, useEffect } from "react";
import { addPost, setStatus } from "../postsSlice";
import { postReducer } from "./postReducer";
import { useSelector, useDispatch } from "react-redux";

export const usePost = () => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const initialState = {
    caption: "",
    photoOrVideo: null,
  };

  const [postState, postDispatch] = useReducer(postReducer, initialState);
  const { addPostStatus } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostStatus === "succeeded") {
      postDispatch({ type: "RESET_FORM" });
      dispatch(setStatus({ name: "addPostStatus", value: "idle" }));
    }
  }, [addPostStatus]);

  const postButtonClicked = () => {
    if (postState.caption === "" && postState.photoOrVideo === null) {
      console.log("Post has no content");
      return;
    }
    const { caption, photoOrVideo } = postState;
    const post = new FormData();
    post.append("author", userId);
    post.append("content", caption);
    post.append("photoOrVideo", photoOrVideo);

    dispatch(addPost({ post, token }));
  };

  return { postState, postDispatch, postButtonClicked, addPostStatus };
};
