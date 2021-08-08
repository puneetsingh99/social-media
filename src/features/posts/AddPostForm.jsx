import React, { useEffect, useRef } from "react";
import { Avatar } from "../../common/components";
import { HiOutlinePhotograph } from "react-icons/hi";
import { BsCameraVideo } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

import {
  selectAuth,
  selectLoggedInUser,
  fetchLoggedInUser,
} from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { usePost } from "./hooks/usePost";

export const AddPostForm = () => {
  const { auth } = useSelector(selectAuth);
  const { isUserLoggedIn, userId, token } = auth;
  const loggedInUser = useSelector(selectLoggedInUser);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const { postState, postDispatch, postButtonClicked, addPostStatus } =
    usePost();

  console.log(postState);
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
          <Avatar img={loggedInUser ? loggedInUser.profilePic : ""} hover />
        </Link>
      </aside>
      <div className="w-full py-4">
        <textarea
          maxLength={280}
          value={postState.caption}
          onChange={(e) => {
            return postDispatch({
              type: "SET_CAPTION",
              payload: e.target.value,
            });
          }}
          className="bg-transparent w-full border-none outline-none text-xl"
          placeholder="What's happening?"
        />
        {postState.photoOrVideo && (
          <div className="flex-c w-full px-4 text-text-gray text-sm">
            <div
              onClick={() => {
                imageRef.current.value = "";
                videoRef.current.value = "";
                postDispatch({ type: "REMOVE_FILE" });
              }}
              className="transparent-pink hover:text-red-500 text-lg p-1 rounded-full mr-2 cursor-pointer"
            >
              <AiOutlineCloseCircle size={25} />
            </div>
            <p>{postState.photoOrVideo.name}</p>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex justify-between cursor-pointer  text-brand">
            <div className="flex justify-start items-center w-max">
              <div
                title="Upload a picture"
                onClick={() => imageRef.current.click()}
                className="transparent-blue p-2 mr-4 rounded-full"
              >
                <HiOutlinePhotograph size={25} />
              </div>
              <div
                title="Upload a video"
                onClick={() => videoRef.current.click()}
                className="transparent-blue p-2 rounded-full"
              >
                <BsCameraVideo size={25} />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              className="hidden"
              onChange={(e) =>
                postDispatch({ type: "SET_FILE", payload: e.target.files[0] })
              }
            />
            <input
              type="file"
              accept="video/*"
              ref={videoRef}
              className="hidden"
              onChange={(e) =>
                postDispatch({ type: "SET_FILE", payload: e.target.files[0] })
              }
            />
          </div>
          <div className="flex">
            <div className="w-max inline-block flex-c px-2 text-text-gray">
              <p
                className={`${
                  postState.caption.length > 270 && "text-red-500"
                }`}
              >
                {280 - postState.caption.length}
              </p>
            </div>
            <div className="pr-4 flex-c w-max inline-block ml-2">
              <button
                onClick={postButtonClicked}
                className="border-brand px-4 py-2 rounded-full text-md font-bold text-white bg-brand"
              >
                {addPostStatus === "loading" ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
