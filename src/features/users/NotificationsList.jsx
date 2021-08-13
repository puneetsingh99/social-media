import React from "react";
import { useSelector } from "react-redux";

import {
  NavDesktop,
  NavMobile,
  SideBar,
  PageHeader,
  Loader,
  EmptyFeed,
} from "../../common/components";
import { Notification } from "./components/Notification";

export const NotificationsList = () => {
  const { auth, loggedInUser } = useSelector((state) => state.auth);
  const { userId } = auth;

  let renderNotifications;

  if (loggedInUser) {
    const notifications = loggedInUser.notifications.filter((n) => {
      if (n.type === "follow") {
        return n.from;
      }
      return n.post;
    });
    const filteredNotifications = notifications.filter(
      (n) => n.from._id !== userId
    );
    const orderedNotifications = filteredNotifications
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    renderNotifications = orderedNotifications.map((n) => {
      const { from, type, post, createdAt } = n;
      const props = { from, type, postId: post?._id, createdAt };
      return <Notification key={n._id} {...props} />;
    });
  }

  return (
    <main className="w-full m-auto md:max-w-1250 md:grid md:grid-cols-252">
      <NavDesktop />
      <section className="md:border border-outline md:border-t-0  md:border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        {loggedInUser ? (
          <div>
            <div className="flex items-center px-3  sticky z-30 top-0 bg-dark-3 border-b border-outline">
              <PageHeader heading={`Notifications`} />
            </div>
            <section>
              {renderNotifications.length === 0 ? (
                <EmptyFeed message={`No notifications`} />
              ) : (
                renderNotifications
              )}
            </section>
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
