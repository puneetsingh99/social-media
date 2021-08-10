import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Avatar } from "../../common/components";
import { ReactionButtons } from "./ReactionButtons";
import { Link, useNavigate } from "react-router-dom";
import { TimeAgo } from "../../common/components";
import { CommentSection } from "./CommentSection";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { removePost } from "./postsSlice";
import { EditPost } from "./components/EditPost";

export const PostDetail = () => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const { post, updatePostStatus } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const { author, content, image, video, createdAt, comments } = post;
  const { _id, firstname, lastname, username, profilePic } = author;

  const [showComments, setShowComments] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const dispatch = useDispatch();

  const onRemoveButtonClicked = () => {
    dispatch(removePost({ postId: post._id, token }));
  };

  const loggedInUsersPost = userId === _id;
  const editorParams = { content, postId: post._id, setShowEditor };

  return (
    <>
      <article
        onClick={() => navigate(`/post/${post._id}`)}
        key={post._id}
        className="flex px-2 py-4 pb-1 border-b border-outline cursor-pointer hover:bg-dark-3-hover"
      >
        <aside onClick={(e) => e.stopPropagation()} className="min-w-max px-3">
          <Link to={`/user/${_id}`} className="text-link">
            <Avatar img={profilePic} hover />
          </Link>
        </aside>

        <div className="w-full">
          <div className="text-md flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/user/${_id}`} className="text-link">
                <h2
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold mr-1 hover:underline"
                >{`${firstname} ${lastname}`}</h2>
              </Link>
              <p className="text-text-gray mr-1">{`@${username}`}</p>
              <div className="text-text-gray">
                <TimeAgo timestamp={createdAt} />
              </div>
            </div>
            {loggedInUsersPost && (
              <div className="flex gap-4">
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
          <div className="pr-4">
            <div>
              {showEditor ? (
                <EditPost {...editorParams} />
              ) : (
                <p className="font-normal mb-4 text-xl">{content}</p>
              )}

              {image && (
                <div className="border border-outline rounded-2xl max-h-275 overflow-hidden">
                  <img
                    src={image}
                    alt={`a post by ${username}`}
                    className="rounded-2xl"
                  />
                </div>
              )}
              {video && (
                <div className="border border-outline rounded-2xl overflow-hidden">
                  <ReactPlayer
                    url={video}
                    controls
                    width="100%"
                    height="auto"
                  />
                </div>
              )}
            </div>
            <div className="w-full mt-2">
              <ReactionButtons post={post} setShowComments={setShowComments} />
            </div>
          </div>
        </div>
      </article>
      {showComments && <CommentSection comments={comments} post={post} />}
    </>
  );
};
