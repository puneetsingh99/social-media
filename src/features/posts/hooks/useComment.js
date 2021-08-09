import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, setStatus } from "../../posts/postsSlice";
import { deleteComment } from "../postsSlice";

export const useComment = (post) => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const { addCommentStatus } = useSelector((state) => state.posts);

  const initialState = {
    content: "",
  };

  const [comment, setComment] = useState(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentStatus === "succeeded") {
      dispatch(setStatus({ name: "addCommentStatus", value: "idle" }));
      setComment({ content: "" });
    }
  }, [addCommentStatus]);

  const onReplyClicked = () => {
    if (comment.content.length === 0) {
      console.log("Cannot post empty comment");
      return;
    }
    const params = {
      madeBy: userId,
      postId: post._id,
      content: comment.content,
      token,
    };
    dispatch(addComment(params));
  };

  const onDeleteButtonClicked = (commentId) => {
    const params = { postId: post._id, commentId, token };
    dispatch(deleteComment(params));
  };

  return {
    comment,
    setComment,
    onReplyClicked,
    addCommentStatus,
    onDeleteButtonClicked,
  };
};
