import React from "react";
import { Avatar, TimeAgo } from "../../../common/components";
import { Link, useNavigate } from "react-router-dom";

export const Notification = ({ from, type, postId, createdAt }) => {
  const { firstname, lastname, username, profilePic, _id } = from;
  const navigate = useNavigate();
  return (
    <article
      onClick={() => {
        postId ? navigate(`/post/${postId}`) : navigate(`/user/${_id}`);
      }}
      className="flex px-2 py-3 border-b border-outline cursor-pointer hover:bg-dark-3-hover"
    >
      <aside onClick={(e) => e.stopPropagation()} className="min-w-max px-3">
        <Link to={`/user/${_id}`} className="text-link">
          <Avatar img={profilePic} size={"md"} />
        </Link>
      </aside>

      <div className="w-full">
        <div className="text-md w-full flex items-start justify-between mb-2">
          <div>
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/user/${_id}`}
              className="text-link"
            >
              <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
            </Link>
            <p className="text-text-gray mr-1">{`@${username}`}</p>
          </div>
          <div className="text-text-gray">
            <TimeAgo timestamp={createdAt} />
          </div>
        </div>
        {type === "like" && <p className="text-lg">{`liked your post`}</p>}
        {type === "comment" && <p>{`commented on your post`}</p>}
        {type === "follow" && <p>{`started following you`}</p>}
      </div>
    </article>
  );
};
