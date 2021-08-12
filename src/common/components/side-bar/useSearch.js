import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../features/users/usersSlice";
import { search } from "./search";

export const useSearch = () => {
  const { allUsers } = useSelector((state) => state.users);
  const { auth, loggedInUser } = useSelector((state) => state.auth);
  const { followers, following } = loggedInUser;
  const { userId } = auth;
  const [keyword, setKeyword] = useState("");

  const searchResult = allUsers.filter((user) => {
    if (keyword !== "") {
      return search(keyword, user);
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [userId, followers, following]);

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
