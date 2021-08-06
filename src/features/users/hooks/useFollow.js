import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFollowers } from "../usersSlice";
import { followButtonState } from "../utils/followButtonStates";

export const useFollow = ({ user }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.auth);

  const { _id, followers, following } = user;
  const isLoggedInUser = user._id === authState.userId;
  const isAFollower = user.followers.find(
    (user) => user._id === authState.userId
  );

  const { followState, followingState, loggedInState } = followButtonState;

  const [followButtonStyle, setFollowButtonStyle] = useState(() => {
    if (isLoggedInUser) {
      return loggedInState;
    }
    return isAFollower ? followingState : followState;
  });

  useEffect(() => {
    const isAFollower = followers.find((user) => user._id === authState.userId);
    const isLoggedInUser = user._id === authState.userId;

    setFollowButtonStyle((currStyle) => {
      if (isLoggedInUser) {
        return loggedInState;
      }
      if (!isAFollower) {
        return followState;
      }
      if (isAFollower) {
        return followingState;
      }
      return currStyle;
    });
  }, [followers, following, _id]);

  const followButtonClicked = () => {
    if (isLoggedInUser) {
      //dispatch appropriate function
      console.log("THOU PROFILE SHALL BE EDIT THEE LOGGED IN USER");
      return;
    }
    if (isAFollower) {
      setFollowButtonStyle(followState);
    }

    if (!isAFollower) {
      setFollowButtonStyle(followingState);
    }

    dispatch(
      updateFollowers({
        loggedInUserId: authState.userId,
        userId: user._id,
        token: authState.token,
      })
    );
  };

  return {
    followButtonStyle,
    followButtonClicked,
    ...user,
  };
};
