import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllUsers,
  setFollowReqStatus,
} from "../../../features/users/usersSlice";
import { search } from "./search";

export const useSearch = () => {
  const { allUsers, followReqStatus } = useSelector((state) => state.users);
  const { auth } = useSelector((state) => state.auth);
  const { userId } = auth;
  const [keyword, setKeyword] = useState("");

  const searchResult = allUsers.filter((user) => {
    if (keyword !== "") {
      return search(keyword, user);
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (followReqStatus === "succeeded") {
      dispatch(fetchAllUsers());
      dispatch(setFollowReqStatus("idle"));
    }
  }, [followReqStatus]);

  const followSuggestions = allUsers.filter((user) => {
    const { followers } = user;
    if (user._id === userId) {
      return false;
    }

    const alreadyAFollower = followers.find((follower) => follower === userId);
    if (alreadyAFollower) {
      return false;
    }
    return true;
  });

  return { keyword, setKeyword, searchResult, followSuggestions };
};
