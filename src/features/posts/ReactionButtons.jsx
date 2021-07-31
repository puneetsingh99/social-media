import React from "react";
import { GoComment } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { RiShareForward2Line } from "react-icons/ri";

export const ReactionButtons = () => {
  const commonClasses = `flex-c cursor-pointer rounded-full p-2`;

  return (
    <article className="flex justify-between items-center w-4/6 text-text-gray">
      <div
        className={`${commonClasses} hover:text-pink-500 transparent-pink`}
        title="Like"
      >
        <AiOutlineHeart size={20} />
      </div>
      <div
        className={`${commonClasses} hover:text-brand transparent-blue`}
        title="Comment"
      >
        <GoComment size={20} />
      </div>
      <div
        className={` ${commonClasses}hover:text-brand transparent-blue`}
        title="Share"
      >
        <RiShareForward2Line size={20} />
      </div>
    </article>
  );
};
