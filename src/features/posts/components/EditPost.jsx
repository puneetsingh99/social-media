import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatus, updatePost } from "../postsSlice";
import { MdDelete } from "react-icons/md";

export const EditPost = ({ content, postId, setShowEditor }) => {
  const { token } = useSelector((state) => state.auth.auth);
  const { updatePostStatus } = useSelector((state) => state.posts);
  const [postContent, setPostContent] = useState(content);

  const dispatch = useDispatch();
  const onSaveButtonClicked = () => {
    const params = {
      postId,
      updateData: { content: postContent },
      token,
    };
    dispatch(updatePost(params));
  };

  useEffect(() => {
    if (updatePostStatus === "succeeded") {
      dispatch(setStatus({ name: "updatePostStatus", value: "idle" }));
      setPostContent("");
      setShowEditor((currState) => !currState);
    }
  }, [updatePostStatus]);

  const loading = updatePostStatus === "loading";

  return (
    <article>
      <textarea
        maxLength={280}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        className="bg-transparent w-full border-none outline-none text-xl"
      />
      <button
        disabled={loading}
        className={`border border-brand px-4 py-1 mr-6 my-4 rounded-full font-bold text-white bg-brand ${
          loading && "cursor-wait"
        }`}
        onClick={onSaveButtonClicked}
      >
        {loading ? "Saving..." : "Save"}
      </button>
      <button
        disabled={loading}
        className="border border-brand px-4 py-1 my-4 rounded-full font-bold text-brand"
        onClick={() => setShowEditor(false)}
      >
        Cancel
      </button>
    </article>
  );
};
