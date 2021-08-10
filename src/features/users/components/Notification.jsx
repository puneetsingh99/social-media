import React from "react";
import { Avatar, TimeAgo } from "../../../common/components";
import { Link } from "react-router-dom";

export const Notification = ({ from, type, postId, createdAt }) => {
  const { firstname, lastname, username, profilePic } = from;
  return (
    <Link to={`/post/${postId}`} className="text-link">
      <article className="flex px-2 py-3 border-b border-outline cursor-pointer hover:bg-dark-3-hover">
        <aside className="min-w-max px-3">
          <Avatar img={profilePic} size={"md"} />
        </aside>

        <div className="w-full">
          <div className="text-md w-full flex items-start justify-between mb-2">
            <div>
              <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
              <p className="text-text-gray mr-1">{`@${username}`}</p>
            </div>
            <div className="text-text-gray">
              <TimeAgo timestamp={createdAt} />
            </div>
          </div>
          {type === "like" && <p className="text-lg">{`liked your post`}</p>}
          {type === "comment" && <p>{`commented on your post`}</p>}
        </div>
      </article>
    </Link>
  );
};
