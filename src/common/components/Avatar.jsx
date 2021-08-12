import React from "react";
import defaultPic from "../../assets/default_profile.png";

export const Avatar = ({ img, size, hover }) => {
  let avatarDimensions;

  switch (size) {
    case "xs":
      avatarDimensions = "w-6 h-6";
      break;
    case "sm":
      avatarDimensions = "w-8 h-8";
      break;

    case "md":
      avatarDimensions = "w-12 h-12";
      break;

    case "lg":
      avatarDimensions = "w-16 h-16";
      break;

    case "xl":
      avatarDimensions = "w-20 h-20";
      break;

    case "2xl":
      avatarDimensions = "w-32 h-32";
      break;

    default:
      avatarDimensions = "w-12 h-12";
      break;
  }

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
