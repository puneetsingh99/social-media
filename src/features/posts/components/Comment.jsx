import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../../common/components";
import { TimeAgo } from "../../../common/components";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

export const Comment = ({ comment, onDeleteButtonClicked }) => {
  const { madeBy, content, createdAt } = comment;
  const { firstname, lastname, username, profilePic, _id } = madeBy;
  const { userId } = useSelector((state) => state.auth.auth);

  const loggedInUsersComment = userId === _id;

  return (
    <article className="flex px-2 py-4 pb-1 cursor-pointer">
      <aside className="min-w-max px-3">
        <Link to={`/user/${_id}`} className="text-link">
          <Avatar size="sm" img={profilePic} hover />
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
            <p className="font-normal text-sm mb-2">{content}</p>
          </div>
        </div>
      </div>
      {loggedInUsersComment && (
        <div
          onClick={() => onDeleteButtonClicked(comment._id)}
          className="flex-c text-text-gray hover:text-red-500 px-1  transition duration-200"
        >
          <MdDelete size={18} />
        </div>
      )}
    </article>
  );
};
