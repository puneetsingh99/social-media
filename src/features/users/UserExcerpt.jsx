import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../common/components";
import { followButtonState } from "./utils/followButtonStates";
import { useSelector, useDispatch } from "react-redux";

export const UserExcerpt = ({ user }) => {
  const { _id, username, firstname, lastname, bio, profilePic } = user;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);

  const isLoggedInUser = user._id === authState.userId;
  const isAFollower = user.followers.find((user) => user === authState.userId);

  const { followState, followingState } = followButtonState;
  const [followButtonStyle, setfollowButtonStyle] = useState(() =>
    isAFollower ? followingState : followState
  );

  const followButtonClicked = () => {
    if (followButtonStyle.text === "Follow") {
      setfollowButtonStyle(followingState);
    }
    if (followButtonStyle.text === "Following") {
      setfollowButtonStyle(followState);
    }
    //dispatch a function here
    // dispatch()
  };

  return (
    <>
      <article className="flex px-2 py-3 border-b border-outline cursor-pointer hover:bg-dark-3-hover">
        <Link to={`/user/${_id}`} className="text-link">
          <aside className="min-w-max px-3">
            <Avatar img={profilePic} />
          </aside>
        </Link>

        <div className="w-full">
          <div className="text-md w-full flex items-start justify-between">
            <div>
              <Link to={`/user/${_id}`} className="text-link">
                <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
              </Link>
              <p className="text-text-gray mr-1">{`@${username}`}</p>
            </div>
            {!isLoggedInUser && (
              <button className={`${followButtonStyle.css} py-1`}>
                {followButtonStyle.text}
              </button>
            )}
          </div>
          <div className="">
            <p>
              Lorem, ipsum dolor sit amet consectetur adi pisicing elit. Hic
              etur adi pisicing elit. Hi
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
