import React from "react";
import { Avatar } from "../../common/components";

export const UserDetails = ({ user }) => {
  const {
    coverPic,
    profilePic,
    firstname,
    lastname,
    username,
    bio,
    followers,
    following,
  } = user;
  return (
    <section>
      <div className="h-200 overflow-hidden border mb-12">
        <img src={coverPic} alt="cover" />
        <div
          className={`absolute top-48 left-30 ml-2 border-4 border-dark-3 rounded-full`}
        >
          <Avatar img={profilePic} size={`2xl`} />
        </div>
      </div>
      <div className="border p-3 px-6">
        <h2 className="text-xl font-extrabold line-height">{`${firstname} ${lastname}`}</h2>
        <p className="text-text-gray text-md line-height">{`@${username}`}</p>

        <p className="text-md mt-2">
          {
            "Be kind to yourself. If you won’t, who will? Host of The Quest Pod "
          }
        </p>
      </div>
      <div className="flex gap-4 text-text-gray text-sm">
        <p>
          <span className="font-md text-text-light font-bold mr-1 border">
            {483}{" "}
          </span>{" "}
          Following
        </p>
        <p>
          <span className="font-md text-text-light font-bold mr-1 border">
            {234}{" "}
          </span>{" "}
          Followers
        </p>
      </div>
    </section>
  );
};
