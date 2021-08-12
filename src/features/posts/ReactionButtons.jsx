import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoComment } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { likePost } from "./postsSlice";
import { CopyLink } from "../../common/components/CopyLink";

export const ReactionButtons = ({
  post,
  setShowComments,
  showLinkCopy,
  setShowLinkCopy,
}) => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const { likes, comments, _id } = post;
  const commonClasses = `flex-c cursor-pointer rounded-full p-2`;
  const alreadyLiked = likes.find((like) => like.likedBy._id === userId);
  const [postLiked, setPostLiked] = useState(() => alreadyLiked);
  const [linkCopied, setLinkCopied] = useState(false);

  const dispatch = useDispatch();

  const likeButtonClicked = () => {
    setPostLiked((currState) => !currState);
    const params = {
      postId: _id,
      likedBy: userId,
      token,
    };
    dispatch(likePost(params));
  };

  const copyLinkParams = {
    linkCopied,
    setLinkCopied,
    postId: post._id,
    setShowLinkCopy,
  };

  return (
    <article className="flex justify-between items-center w-9/12 md:w-4/6 text-text-gray">
      <div
        onClick={(e) => {
          e.stopPropagation();
          likeButtonClicked();
        }}
        className={`flex-c hover:text-pink-500 ${postLiked && "text-pink-500"}`}
      >
        <div className={`${commonClasses} transparent-pink`} title="Like">
          {postLiked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
        </div>
        {alreadyLiked && (
          <p className="ml-2">{postLiked ? likes.length : likes.length - 1}</p>
        )}
        {!alreadyLiked && (
          <p className="ml-2">{postLiked ? likes.length + 1 : likes.length}</p>
        )}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowComments((currState) => !currState);
        }}
        className="flex-c hover:text-brand"
      >
        <div className={`${commonClasses}  transparent-blue`} title="Comment">
          <GoComment size={18} />
        </div>
        <p className="ml-2">{comments.length}</p>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowLinkCopy((currState) => !currState);
        }}
        className={` ${commonClasses} p-4 hover:text-brand transparent-blue relative`}
        title="Share"
      >
        <FiShare size={18} />
        {showLinkCopy && (
          <article className="absolute bottom-10 shadow-md bg-dark-3 rounded-full p-2">
            <CopyLink {...copyLinkParams} />
          </article>
        )}
      </div>
    </article>
  );
};
