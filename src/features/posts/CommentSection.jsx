import React, { useEffect } from "react";
import { Comment } from "./components/Comment";
import { setStatus } from "./postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useComment } from "./hooks/useComment";
import { useModal } from "../../common/contexts/ModalContext";

export const CommentSection = ({ comments, post }) => {
  const dispatch = useDispatch();
  const {
    comment,
    setComment,
    onReplyClicked,
    addCommentStatus,
    onRemoveButtonClicked,
  } = useComment(post);

  const emptyComment = comment.content.length === 0;

  const { deleteCommentStatus } = useSelector((state) => state.posts);
  const { cancel } = useModal();

  const orderedComments = comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const commentList = orderedComments.map((comment) => (
    <Comment
      key={comment._id}
      comment={comment}
      onRemoveButtonClicked={onRemoveButtonClicked}
    />
  ));

  const loading = addCommentStatus === "loading";

  useEffect(() => {
    if (deleteCommentStatus === "succeeded") {
      cancel();
      dispatch(setStatus({ name: "deleteCommentStatus", value: "idle" }));
    }
  }, [deleteCommentStatus]);

  return (
    <section className="py-4 px-2 md:p-4 border-b border-outline">
      <div className="flex-c gap-2 md:gap-4 md:pl-4">
        <textarea
          maxLength={150}
          type="text"
          rows={1}
          value={comment.content}
          onChange={(e) =>
            setComment((c) => ({
              content: e.target.value,
            }))
          }
          placeholder="Write a reply..."
          className="bg-transparent w-full border-2 border-outline outline-none rounded-2xl p-2"
        />
        <div>
          <button
            title="Reply to this post"
            disabled={loading || emptyComment}
            onClick={onReplyClicked}
            className={`border border-brand px-4 py-1 self-start rounded-full font-bold text-brand transparent-brand ${
              loading && "cursor-wait"
            }`}
          >
            {loading ? "Replying..." : "Reply"}
          </button>
        </div>
      </div>
      {commentList.length > 0 && (
        <section className="mt-2 max-h-300 overflow-scroll overflow-x-hidden">
          {commentList}
        </section>
      )}
    </section>
  );
};
