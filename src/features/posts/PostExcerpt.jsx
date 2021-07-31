import React from "react";
import { Avatar } from "../../common/components";
import ReactPlayer from "react-player";

export const PostExcerpt = ({ post }) => {
  const { author, content, image, video } = post;
  const { _id, firstname, lastname, username, profilePic } = author;

  console.log(profilePic);

  return (
    <article key={post._id} className="flex px-2 py-4 border-b border-outline">
      <aside className="min-w-max px-3">
        <Avatar img={profilePic} />
      </aside>
      <div>
        <div className="text-md flex items-center">
          <h2 className="font-bold mr-1">{`${firstname} ${lastname}`}</h2>
          <p className="text-text-gray mr-1">{`@${username}`}</p>
          <p className="text-text-gray ml-1">
            <span className="text-sm">•</span> {` 5 minutes ago`}
          </p>
        </div>
        <div className="pr-4">
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
              <ReactPlayer
                url={video}
                controls
                className="rounded-3xl"
                width="100%"
                height="auto"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
