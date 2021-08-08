import React, { useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onEditProfileClicked } from "../../../auth/authSlice";
import { editProfileReducer } from "./editProfileReducer";

export const useEditProfile = (user) => {
  const { userId, token } = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
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
  const [editProfile, editProfileDispatch] = useReducer(
    editProfileReducer,
    initialState
  );
  useEffect(() => {
    editProfileDispatch({ type: "RESET_USER", payload: user });
  }, [user]);

  const saveButtonClicked = () => {
    const { bio, firstname, lastname, newProfilePic, newCoverPic } =
      editProfile;

    const formData = new FormData();
    formData.append("newProfilePic", newProfilePic);
    formData.append("newCoverPic", newCoverPic);
    formData.append("bio", bio);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    const params = {
      userId,
      formData,
      token,
    };
    dispatch(onEditProfileClicked(params));
  };
  return { editProfile, editProfileDispatch, saveButtonClicked };
};
