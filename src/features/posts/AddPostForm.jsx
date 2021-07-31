import React from "react";
import { Avatar } from "../../common/components";
import { HiOutlinePhotograph } from "react-icons/hi";
import defaultProfilePic from "../../assets/default_profile.png";

export const AddPostForm = () => {
  let profilePic = defaultProfilePic;
  return (
    <article className="flex px-2 py-3 pb-1 border-b border-outline">
      <aside className="min-w-max px-3">
        <Avatar img={profilePic} />
      </aside>
      <div className="w-full py-4">
        <textarea
          className="bg-transparent w-full border-none outline-none text-xl"
          placeholder="What's happening?"
        ></textarea>
        <div
          className="flex-c cursor-pointer rounded-full p-2 text-brand transparent-blue w-max"
          title="Media"
        >
          <HiOutlinePhotograph size={25} />
        </div>
      </div>
    </article>
  );
};
