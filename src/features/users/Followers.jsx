import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "./usersSlice";
import { UserExcerpt } from "./UserExcerpt";

import {
  NavDesktop,
  SideBar,
  PageHeader,
  Loader,
  Error,
} from "../../common/components";

export const Followers = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const { token } = auth;

  const userState = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser({ userId, token }));
  }, [userId]);

  const [showFollowers, setShowFollowers] = useState(true);
  let renderUsers;

  if (userState.user) {
    if (showFollowers) {
      renderUsers = userState.user.followers.map((user) => (
        <UserExcerpt key={user._id} user={user} />
      ));
    }
    if (!showFollowers) {
      renderUsers = userState.user.following.map((user) => (
        <UserExcerpt key={user._id} user={user} />
      ));
    }
  }
  return (
    <main className="max-w-1250 m-auto grid grid-cols-252">
      <NavDesktop />
      <section className="border border-outline border-t-0  border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        {userState.user ? (
          <div>
            <div className="flex items-center px-3  sticky z-30 top-0 bg-dark-3">
              <div
                onClick={() => navigate(-1)}
                className="p-1 rounded-full transparent-blue cursor-pointer text-brand mr-6"
              >
                <IoIosArrowRoundBack size={30} />
              </div>

              <PageHeader
                heading={`${userState.user.firstname} ${userState.user.lastname}`}
                subHeading={`@${userState.user.username}`}
              />
            </div>
            <nav className="flex border-b border-outline">
              <div
                onClick={() => setShowFollowers(true)}
                className="w-full flex-c transparent-brand text-text-gray hover:text-brand font-bold cursor-pointer"
              >
                <p
                  className={`py-4 ${
                    showFollowers && "border-b-4 border-b-brand text-brand"
                  }`}
                >
                  Followers
                </p>
              </div>
              <div
                onClick={() => setShowFollowers(false)}
                className="w-full flex-c transparent-brand text-text-gray hover:text-brand font-bold cursor-pointer"
              >
                <p
                  className={`py-4 ${
                    !showFollowers && "border-b-4 border-b-brand text-brand"
                  }`}
                >
                  Following
                </p>
              </div>
            </nav>
            <section>{renderUsers}</section>
          </div>
        ) : (
          <Loader />
        )}
      </section>
      <SideBar />
    </main>
  );
};
