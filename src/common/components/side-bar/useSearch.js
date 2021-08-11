import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { search } from "./search";

export const useSearch = () => {
  const { allUsers } = useSelector((state) => state.users);
  const [keyword, setKeyword] = useState("");

  const searchResult = allUsers.filter((user) => {
    if (keyword !== "") {
      return search(keyword, user);
    }
  });

  return { keyword, setKeyword, searchResult };
};
