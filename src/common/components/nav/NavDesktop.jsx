import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { RiHome7Line } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "./appRoutes";

export const NavDesktop = () => {
  const { pathname } = useLocation();
  const { userId } = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const { home, notifications } = appRoutes;
  const notificationStyle = `flex text-xl font-extrabold gap-4 transparent-brand hover:text-brand border border-none px-4 py-3 rounded-full font-bold bg-brand w-max mb-2`;
  const profileRoute = `/user/${userId}`;
  console.log(pathname === home);

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
      </nav>
    </aside>
  );
};
