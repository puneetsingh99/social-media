import React, { useState } from "react";
import { useSelector } from "react-redux";
import { search } from "./search";

export const useSearch = () => {
  const { allUsers } = useSelector((state) => state.users);
  const { userId } = useSelector((state) => state.auth.auth);
  const [keyword, setKeyword] = useState("");

  const searchResult = allUsers.filter((user) => {
    if (keyword !== "") {
      return search(keyword, user);
    }
  });

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
