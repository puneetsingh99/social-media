import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Avatar } from "../../common/components";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";
import { TimeAgo } from "../../common/components";
import { CommentSection } from "./CommentSection";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { removePost } from "./postsSlice";
import { EditPost } from "./components/EditPost";
import { useModal } from "../../common/contexts/ModalContext";

export const PostDetail = () => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const { post } = useSelector((state) => state.posts);

  const { author, content, image, video, createdAt, comments } = post;
  const { _id, firstname, lastname, username, profilePic } = author;

  const [showComments, setShowComments] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showLinkCopy, setShowLinkCopy] = useState(false);

  const dispatch = useDispatch();

  const onRemoveButtonClicked = () => {
    modalDispatch({
      type: "SET_BUTTON_NAME",
      payload: "Delete",
    });
    modalDispatch({
      type: "SET_MODAL_STATE",
      payload: true,
    });
    modalDispatch({
      type: "SET_ACTION_TYPE",
      payload: "remove post",
    });
    modalDispatch({
      type: "SET_CONFIRM_HANDLER",
      payload: () => dispatch(removePost({ postId: post._id, token })),
    });
  };

  const loggedInUsersPost = userId === _id;
  const editorParams = { content, postId: post._id, setShowEditor };
  const reactionButtonsParams = {
    showLinkCopy,
    setShowLinkCopy,
    post,
    setShowComments,
  };

  const { modalDispatch } = useModal();

  return (
    <>
      <article
        onClick={() => {
          setShowLinkCopy(false);
        }}
        key={post._id}
        className="py-4 pb-1 border-b border-outline cursor-pointer hover:bg-dark-3-hover"
      >
        <aside className="w-full flex">
          <div className="w-max px-3 md:px-4">
            <Link to={`/user/${_id}`} className="text-link">
              <Avatar img={profilePic} hover />
            </Link>
          </div>
          <div className="w-10/12">
            <div className="text-md flex items-center justify-between">
              <div className="flex items-center">
                <section>
                  <Link to={`/user/${_id}`} className="text-link">
                    <h2
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold mr-1 hover:underline"
                    >{`${firstname} ${lastname}`}</h2>
                  </Link>
                  <p className="text-text-gray mr-1">{`@${username}`}</p>
                </section>
              </div>
              {loggedInUsersPost && (
                <div className="flex gap-2 md:gap-4">
                  <div
                    className="p-2 rounded-full transparent-pink flex-c text-text-gray hover:text-red-500   transition duration-200"
                    title="Remove this comment"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveButtonClicked();
                    }}
                  >
                    <MdDelete size={22} />
                  </div>
                  <p
                    className="p-2 rounded-full transparent-brand flex-c text-text-gray hover:text-brand   transition duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditor((currState) => !currState);
                    }}
                  >
                    <FiEdit2 size={20} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
        <div className="px-3 md:px-4 pt-2">
          <div>
            {showEditor ? (
              <EditPost {...editorParams} />
            ) : (
              <p className="font-normal mb-4 text-xl">{content}</p>
            )}

            {image && (
              <div className="rounded-2xl max-h-275 overflow-hidden">
                <img
                  src={image}
                  alt={`a post by ${username}`}
                  className="rounded-2xl border border-outline"
                />
              </div>
            )}
            {video && (
              <div className="border border-outline rounded-2xl overflow-hidden">
                <ReactPlayer url={video} controls width="100%" height="auto" />
              </div>
            )}
          </div>
          <div className="text-text-gray py-2">
            <TimeAgo timestamp={createdAt} full />
          </div>
          <div className="w-full">
            <ReactionButtons {...reactionButtonsParams} />
          </div>
        </div>
      </article>
      {showComments && <CommentSection comments={comments} post={post} />}
    </>
  );
};
