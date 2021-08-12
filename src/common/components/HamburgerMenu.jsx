import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from ".";
import { Link } from "react-router-dom";
import { notificationStyle } from "./nav/utils";
import { logout } from "../../features/auth/authSlice";
import { HiOutlineUser } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

export const HamburgerMenu = ({ setShowHamburgerMenu }) => {
  const { auth, loggedInUser } = useSelector((state) => state.auth);
  const { firstname, lastname, username, followers, following, profilePic } =
    loggedInUser;
  const profileRoute = `/user/${auth.userId}`;
  const dispatch = useDispatch();
  return (
    <main>
      <article className="w-full h-screen bg-dark-3">
        <section className="px-6 border-b border-outline">
          <div className="py-6">
            <Avatar img={profilePic} size="lg" />
          </div>
          <h2
            onClick={(e) => e.stopPropagation()}
            className="font-bold mr-1"
          >{`${firstname} ${lastname}`}</h2>
          <p className="text-text-gray mr-1">{`@${username}`}</p>
          <div className="flex gap-4 py-2">
            <p>
              {following.length}
              <span className="text-text-gray ml-2">Following</span>
            </p>
            <p>
              {followers.length}
              <span className="text-text-gray ml-2">Followers</span>
            </p>
          </div>
        </section>

        <nav onClick={() => setShowHamburgerMenu(false)} className="py-2">
          <Link to={profileRoute}>
            <div className={`${notificationStyle} `}>
              <HiOutlineUser size={25} />
              <h1>Profile</h1>
            </div>
          </Link>
          <div className="pl-1">
            <div
              onClick={() => dispatch(logout())}
              className={`${notificationStyle}`}
            >
              <FiLogOut size={25} />
              <h1>Logout</h1>
            </div>
          </div>
        </nav>
      </article>
    </main>
  );
};
