import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiHome7Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import { notificationStyle } from "./utils";
import { fetchLoggedInUser } from "../../../features/auth/authSlice";

export const NavMobile = () => {
  const { pathname } = useLocation();
  const { auth } = useSelector((state) => state.auth);
  const { userId, token } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUser({ userId, token }));
  }, [userId]);

  const { home, notifications, search } = appRoutes;

  const profileRoute = `/user/${userId}`;

  return (
    <footer className="md:hidden sticky bottom-0 b px-4 py-1">
      <nav className="flex justify-between items-center">
        <Link to={home}>
          <div
            className={`${notificationStyle} ${
              pathname === home && "text-brand"
            }`}
          >
            <RiHome7Line size={25} />
          </div>
        </Link>
        <Link to={notifications}>
          <div
            className={`${notificationStyle} ${
              pathname === notifications && "text-brand"
            }`}
          >
            <IoNotificationsOutline size={25} />
          </div>
        </Link>
        <Link to={search}>
          <div
            className={`${notificationStyle} ${
              pathname === search && "text-brand"
            }`}
          >
            <RiSearch2Line size={25} />
          </div>
        </Link>
        <Link to={profileRoute}>
          <div
            className={`${notificationStyle} ${
              pathname === profileRoute && "text-brand"
            }`}
          >
            <HiOutlineUser size={25} />
          </div>
        </Link>
      </nav>
    </footer>
  );
};
