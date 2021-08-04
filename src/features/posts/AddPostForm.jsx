import React, { useEffect } from "react";
import { Avatar } from "../../common/components";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  selectAuth,
  selectLoggedInUser,
  fetchLoggedInUser,
} from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const AddPostForm = () => {
  const { auth } = useSelector(selectAuth);
  const { isUserLoggedIn, userId, token } = auth;
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchLoggedInUser({ userId, token }));
    }
  }, [isUserLoggedIn, userId, dispatch]);

  return (
    <article className="flex px-2 py-3 pb-1 border-b border-outline">
      <aside className="min-w-max px-3">
        <Link to={`/user/${userId}`} className="text-link">
          <Avatar img={loggedInUser ? loggedInUser.profilePic : ""} />
        </Link>
      </aside>
      <div className="w-full py-4">
        <textarea
          className="bg-transparent w-full border-none outline-none text-xl"
          placeholder="What's happening?"
        ></textarea>
        <div
          className="flex-c cursor-pointer rounded-full p-2 text-brand transparent-blue w-max"
          title="Media"
        >
          <HiOutlinePhotograph size={25} />
        </div>
      </div>
    </article>
  );
};
