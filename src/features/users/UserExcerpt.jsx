import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../common/components";
import { followButtonState } from "./utils/followButtonStates";
import { useSelector, useDispatch } from "react-redux";
import { onFollowButtonClicked } from "./usersSlice";

export const UserExcerpt = ({ user }) => {
  const { _id, username, firstname, lastname, bio, profilePic } = user;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);
  const { token } = authState;

  const isLoggedInUser = user._id === authState.userId;
  const isAFollower = user.followers.find((user) => user === authState.userId);

  const { followState, followingState } = followButtonState;
  const [followButton, setFollowButton] = useState(() =>
    isAFollower ? followingState : followState
  );

  const followButtonClicked = (e) => {
    e.preventDefault();
    if (followButton.text === "Follow") {
      setFollowButton(followingState);
    }
    if (followButton.text === "Following") {
      setFollowButton(followState);
    }
    dispatch(
      onFollowButtonClicked({
        loggedInUserId: authState.userId,
        userId: user._id,
        token,
      })
    );
  };

  return (
    <>
      <Link to={`/user/${_id}`} className="text-link">
        <article className="flex px-2 py-3 border-b border-outline cursor-pointer hover:bg-dark-3-hover">
          <aside className="min-w-max px-3">
            <Avatar img={profilePic} />
          </aside>

          <div className="w-full">
            <div className="text-md w-full flex items-start justify-between">
              <div>
                <h2 className="font-bold mr-1 hover:underline">{`${firstname} ${lastname}`}</h2>
                <p className="text-text-gray mr-1">{`@${username}`}</p>
              </div>
              {!isLoggedInUser && (
                <button
                  onClick={(e) => followButtonClicked(e)}
                  className={`${followButton.css} py-1`}
                >
                  {followButton.text}
                </button>
              )}
            </div>
            <div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adi pisicing elit. Hic
                etur adi pisicing elit. Hi
              </p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};
