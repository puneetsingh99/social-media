import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Avatar } from "../../common/components";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";
import { TimeAgo } from "../../common/components";

export const PostExcerpt = ({ post }) => {
  const { author, content, image, video, createdAt } = post;
  const { _id, firstname, lastname, username, profilePic } = author;
  // const [showComments, setShowComments] = useState(false);

  return (
    <article
      key={post._id}
      className="flex px-2 py-4 pb-1 border-b border-outline cursor-pointer hover:bg-dark-3-hover"
    >
      <aside className="min-w-max px-3">
        <Link to={`/user/${_id}`} className="text-link">
          <Avatar img={profilePic} hover />
        </Link>
      </aside>

      <div className="w-full">
        <div className="text-md flex items-center ">
          <Link to={`/user/${_id}`} className="text-link">
            <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
          </Link>
          <p className="text-text-gray mr-1">{`@${username}`}</p>
          <div className="text-text-gray">
            <TimeAgo timestamp={createdAt} />
          </div>
        </div>
        <div className="pr-4">
          <div>
            <p className="font-normal mb-4">{content}</p>

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
                <ReactPlayer url={video} controls width="100%" height="auto" />
              </div>
            )}
          </div>
          <div className="w-full mt-2">
            <ReactionButtons post={post} />
          </div>
        </div>
      </div>
    </article>
  );
};
