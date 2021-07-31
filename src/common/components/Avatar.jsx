import React from "react";
import defaultPic from "../../assets/default_profile.png";

export const Avatar = ({ img, size }) => {
  let avatarSize;

  switch (size) {
    case "sm":
      avatarSize = 8;
      break;

    case "lg":
      avatarSize = 12;
      break;

    case "md":
      avatarSize = 16;
      break;

    default:
      avatarSize = 12;
      break;
  }

  const imgSrc = img || defaultPic;

  return (
    <img
      src={imgSrc}
      alt="profile pic of the user"
      className={`w-${avatarSize} h-${avatarSize} rounded-full`}
    />
  );
};
