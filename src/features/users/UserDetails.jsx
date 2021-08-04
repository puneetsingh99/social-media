import React, { useState } from "react";
import { Avatar } from "../../common/components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getFollowButtonText } from "./utils/getFollowButtonText";
import { getFollowButtonCSS } from "./utils/getFollowButtonCSS";

export const UserDetails = ({ user }) => {
  const { userId } = useSelector((state) => state.auth.auth);
  const {
    _id,
    coverPic,
    profilePic,
    firstname,
    lastname,
    username,
    bio,
    followers,
    following,
  } = user;

  const isLoggedInUser = _id === userId;
  const inFollowersList = followers.find((user) => user._id === userId);

  const [hoverState, setHoverState] = useState(false);
  const followButtonParams = { isLoggedInUser, inFollowersList, hoverState };
  const followButtonText = getFollowButtonText(followButtonParams);
  const followButtonCSS = getFollowButtonCSS(followButtonParams);

  return (
    <section>
      <div className="relative">
        <div className="h-200 overflow-hidden">
          <img src={coverPic} alt="cover" className="w-full" />
        </div>
        <div
          className={`absolute top-32 left-30 ml-4 border-4 border-dark-3 rounded-full`}
        >
          <Avatar img={profilePic} size={`2xl`} />
        </div>
        <div className="flex justify-end items-center h-full pr-6 py-3">
          <button
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            className={followButtonCSS}
          >
            {followButtonText}
          </button>
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-xl font-extrabold line-height">{`${firstname} ${lastname}`}</h2>
        <p className="text-text-gray text-md line-height">{`@${username}`}</p>

        <p className="text-md mt-2">
          {
            "Be kind to yourself. If you won’t, who will? Host of The Quest Pod "
          }
        </p>
        <div className="flex gap-4 text-text-gray text-sm mt-3">
          <p>
            <span className="font-md text-text-light font-bold mr-1">
              {483}
            </span>
            Following
          </p>
          <p>
            <span className="font-md text-text-light font-bold mr-1">
              {234}
            </span>
            Followers
          </p>
        </div>
      </div>
    </section>
  );
};
