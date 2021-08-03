import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUser } from "./usersSlice";

export const User = () => {
  const { userId } = useParams();
  const { auth } = useSelector((state) => state.auth);
  const { token } = auth;
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser({ userId, token }));
    }
  }, [userId]);

  console.log("User", user);
  return <h1>User</h1>;
};
