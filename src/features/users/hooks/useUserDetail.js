import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFollowers, fetchUser } from "../usersSlice";

export const useUserDetail = () => {
  console.log("COMING FROM USER DETAIL HOOK");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);
  const { user } = useSelector((state) => state.users);

  console.log("*********************");
  return "useUserDetailHook";
};
