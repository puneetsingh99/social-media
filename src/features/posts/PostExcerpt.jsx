import React from "react";
import ReactPlayer from "react-player";
import { Avatar } from "../../common/components";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";

export const PostExcerpt = ({ post }) => {
  const { author, content, image, video } = post;
  const { _id, firstname, lastname, username, profilePic } = author;
  return (
    <article
      key={post._id}
      className="flex px-2 py-4 pb-1 border-b border-outline cursor-pointer hover:bg-dark-3-hover"
    >
      <Link to={`/user/${_id}`} className="text-link">
        <aside className="min-w-max px-3">
          <Avatar img={profilePic} />
        </aside>
      </Link>

      <div className="w-full">
        <div className="text-md flex items-start">
          <Link to={`/user/${_id}`} className="text-link">
            <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
          </Link>
          <p className="text-text-gray mr-1">{`@${username}`}</p>
          <p className="text-text-gray ml-1">
            <span className="text-sm">•</span> {` 5 minutes ago`}
          </p>
        </div>
        <div className="pr-4">
          <div>
            <p className="font-normal mb-4">{content}</p>

            {image && (
              <div className="border border-outline rounded-2xl">
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
            <ReactionButtons />
          </div>
        </div>
      </div>
    </article>
  );
};
