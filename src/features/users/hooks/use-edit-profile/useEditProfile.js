import React, { useReducer } from "react";
import { editProfileReducer } from "./editProfileReducer";
export const useEditProfile = (user) => {
  const { firstname, lastname, bio, profilePic, coverPic } = user;
  const initialState = {
    firstname,
    lastname,
    bio,
    profilePic,
    coverPic,
    newProfilePic: null,
    newCoverPic: null,
  };
  const [editProfile, dispatch] = useReducer(editProfileReducer, initialState);
  console.log({
    newProfilePic: editProfile.newProfilePic,
    newCoverPic: editProfile.newCoverPic,
    firstname: editProfile.firstname,
    lastname: editProfile.lastname,
    bio: editProfile.bio,
  });
  const saveButtonClicked = () => {
    console.log(editProfile);
  };
  return { editProfile, dispatch, saveButtonClicked };
};
