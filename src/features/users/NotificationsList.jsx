import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./usersSlice";

import {
  NavDesktop,
  SideBar,
  PageHeader,
  Loader,
} from "../../common/components";
import { Notification } from "./components/Notification";

export const Notifications = () => {
  const { auth } = useSelector((state) => state.auth);
  const { userId, token } = auth;

  const userState = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser({ userId, token }));
  }, [userId, userState.allUsers]);

  let renderNotifications;

  if (userState.user) {
    const notifications = userState.user.notifications.filter((n) => n.post);
    renderNotifications = notifications.map((n) => {
      const { from, type, post, createdAt } = n;
      const props = { from, type, postId: post._id, createdAt };
      return <Notification key={n._id} {...props} />;
    });
  }

  return (
    <main className="max-w-1250 m-auto grid grid-cols-252">
      <NavDesktop />
      <section className="border border-outline border-t-0  border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        {userState.user ? (
          <div>
            <div className="flex items-center px-3  sticky z-30 top-0 bg-dark-3 border-b border-outline">
              <PageHeader heading={`Notifications`} />
            </div>
            <section>{renderNotifications}</section>
          </div>
        ) : (
          <Loader />
        )}
      </section>
      <SideBar />
    </main>
  );
};
