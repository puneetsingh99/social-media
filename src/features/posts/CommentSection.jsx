import React from "react";
import { Comment } from "./components/Comment";

import { useComment } from "./hooks/useComment";

export const CommentSection = ({ comments, post }) => {
  const {
    comment,
    setComment,
    onReplyClicked,
    addCommentStatus,
    onDeleteButtonClicked,
  } = useComment(post);

  const orderedComments = comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const commentList = orderedComments.map((comment) => (
    <Comment
      key={comment._id}
      comment={comment}
      onDeleteButtonClicked={onDeleteButtonClicked}
    />
  ));

  const loading = addCommentStatus === "loading";

  return (
    <section className="p-4 border-b border-outline">
      <div className="flex-c gap-4 pl-4">
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
            disabled={loading}
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
