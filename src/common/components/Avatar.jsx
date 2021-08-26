import React from "react";
import defaultPic from "../../assets/default_profile.png";

const avatarSize = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
  "2xl": "w-32 h-32",
};

export const Avatar = ({ img, size, hover }) => {
  let avatarDimensions = avatarSize[size] || "w-12 h-12";

  const imgSrc = img || defaultPic;

  return (
    <div className="relative rounded-full">
      <img
        src={imgSrc}
        alt="profile pic of the user"
        className={`${avatarDimensions} rounded-full object-fit`}
      />
      <div
        className={`absolute inset-0 z-0 rounded-full ${
          hover && "hover:bg-semi-trans"
        } transition duration-200 ease-in-out`}
      ></div>
    </div>
  );
};
