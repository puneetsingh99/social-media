import React from "react";
import defaultPic from "../../assets/default_profile.png";

export const Avatar = ({ img, size }) => {
  let avatarDimensions;

  switch (size) {
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
      avatarDimensions = "w-28 h-28";
      break;

    default:
      avatarDimensions = "w-12 h-12";
      break;
  }

  const imgSrc = img || defaultPic;

  return (
    <img
      src={imgSrc}
      alt="profile pic of the user"
      className={`${avatarDimensions} rounded-full object-fit hover:bg-semi-transparent`}
    />
  );
};
