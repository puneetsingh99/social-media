import React from "react";
import { Avatar } from "../../common/components";
import { useFollow } from "./hooks/useFollow";
import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";

export const UserDetails = ({ user }) => {
  const {
    followButtonClicked,
    followButtonStyle,
    showEditProfile,
    setShowEditProfile,
    followReqStatus,
  } = useFollow({ user });

  return (
    <section>
      <div className="relative">
        <div className="h-200 overflow-hidden">
          <img src={user.coverPic} alt="cover" className="w-full" />
        </div>
        <div
          className={`absolute top-32 left-30 ml-4 border-4 border-dark-3 rounded-full`}
        >
          <Avatar img={user.profilePic} size={`2xl`} />
        </div>
        <div
          className={`flex justify-end items-center h-full pr-3 md:pr-6 py-3`}
        >
          <button
            disabled={followReqStatus === "loading"}
            onClick={followButtonClicked}
            className={`${followButtonStyle.css}  ${
              followReqStatus === "loading" && "cursor-wait"
            }`}
          >
            {followButtonStyle.text}
          </button>
          {showEditProfile && (
            <EditProfile setShowEditProfile={setShowEditProfile} user={user} />
          )}
        </div>
      </div>
      <div className="px-3 md:px-4">
        <h2 className="text-xl font-extrabold line-height">{`${user.firstname} ${user.lastname}`}</h2>
        <p className="text-text-gray text-md line-height">{`@${user.username}`}</p>

        <p className="text-md mt-2">{user.bio}</p>
        <div className="flex gap-4 text-text-gray text-sm mt-3">
          <Link to={`/user/${user._id}/following`} className="link-text">
            <p className="hover:underline cursor-pointer">
              <span className="font-md text-text-light font-bold mr-1">
                {user.following.length}
              </span>
              Following
            </p>
          </Link>
          <Link to={`/user/${user._id}/followers`} className="link-text">
            <p className="hover:underline cursor-pointer">
              <span className="font-md text-text-light font-bold mr-1">
                {user.followers.length}
              </span>
              Followers
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
