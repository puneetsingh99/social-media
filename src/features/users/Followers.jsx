import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "./usersSlice";
import { UserExcerpt } from "./UserExcerpt";
import { NavMobile } from "../../common/components";

import {
  NavDesktop,
  SideBar,
  PageHeader,
  Loader,
  Error,
  EmptyFeed,
} from "../../common/components";

export const Followers = () => {
  const { userId, followersOrFollowing } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const { token } = auth;

  const userState = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser({ userId, token }));
  }, [userId, userState.allUsers]);

  const [showFollowers, setShowFollowers] = useState(() =>
    followersOrFollowing === "followers" ? true : false
  );

  let renderUsers;

  if (userState.user) {
    if (showFollowers) {
      renderUsers = userState.user.followers.map((user) => (
        <div key={user._id} className="border-b border-outline">
          <UserExcerpt user={user} />
        </div>
      ));
    }
    if (!showFollowers) {
      renderUsers = userState.user.following.map((user) => (
        <div key={user._id} className="border-b border-outline">
          <UserExcerpt user={user} />
        </div>
      ));
    }
  }
  return (
    <main className="w-full m-auto md:max-w-1250 md:grid md:grid-cols-252">
      <NavDesktop />
      <section className="md:border md:border-outline md:border-t-0 md:border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        {userState.user ? (
          <div>
            <div className="flex items-center px-3 sticky z-30 top-0 bg-dark-3">
              <div
                onClick={() => navigate(-1)}
                className="p-1 rounded-full transparent-blue cursor-pointer text-brand mr-3 md:mr-6"
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
            {renderUsers.length === 0 && (
              <section>{<EmptyFeed message={"Such empty :("} />}</section>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </section>
      <section className="md:hidden bg-dark-3 border-t border-outline sticky bottom-0 z-10">
        <NavMobile />
      </section>
      <SideBar />
    </main>
  );
};
