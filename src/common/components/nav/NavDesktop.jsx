import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { RiHome7Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import { notificationStyle } from "./utils";
import { Avatar } from "..";
import { fetchLoggedInUser } from "../../../features/auth/authSlice";

export const NavDesktop = () => {
  const { pathname } = useLocation();
  const { auth, loggedInUser } = useSelector((state) => state.auth);
  const { userId, token } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUser({ userId, token }));
  }, [userId]);

  const { home, notifications } = appRoutes;

  const profileRoute = `/user/${userId}`;

  return (
    <aside className="hidden sm:block sticky top-0">
      <div className="p-2">
        <Link to={home}>
          <div
            className={`p-2 w-max rounded-full transparent-brand hover:cursor-pointer`}
          >
            <FaTwitter size={30} />
          </div>
        </Link>
      </div>
      <nav>
        <Link to={home}>
          <div
            className={`${notificationStyle} ${
              pathname === home && "text-brand"
            }`}
          >
            <RiHome7Line size={25} />
            <h1>Home</h1>
          </div>
        </Link>
        <Link to={notifications}>
          <div
            className={`${notificationStyle} ${
              pathname === notifications && "text-brand"
            }`}
          >
            <IoNotificationsOutline size={25} />
            <h1>Notifications</h1>
          </div>
        </Link>
        <Link to={profileRoute}>
          <div
            className={`${notificationStyle} ${
              pathname === profileRoute && "text-brand"
            }`}
          >
            <HiOutlineUser size={25} />
            <h1>Profile</h1>
          </div>
        </Link>
        <div
          onClick={() => dispatch(logout())}
          className={`${notificationStyle} hover:cursor-pointer`}
        >
          <FiLogOut size={25} />
          <h1>Logout</h1>
        </div>
        <Link to={profileRoute} className="text-link">
          {loggedInUser && (
            <article className="flex px-4 py-3 cursor-pointer transparent-brand w-max rounded-full mt-12">
              <aside className="min-w-max">
                <Avatar img={loggedInUser.profilePic} size={"md"} />
              </aside>

              <div className="w-full ml-3">
                <div className="text-md w-full flex items-start justify-between">
                  <div>
                    <h2 className="font-bold mr-1">{`${loggedInUser.firstname} ${loggedInUser.lastname}`}</h2>
                    <p className="text-text-gray mr-1">{`@${loggedInUser.username}`}</p>
                  </div>
                </div>
              </div>
            </article>
          )}
        </Link>
      </nav>
    </aside>
  );
};
