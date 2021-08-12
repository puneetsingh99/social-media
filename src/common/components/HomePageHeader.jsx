import React from "react";
import { Avatar } from ".";

export const HomePageHeader = ({ setShowHamburgerMenu, loggedInUser }) => {
  return (
    <header className="md:hidden flex items-center border-b border-outline px-3  sticky z-30 top-0 bg-dark-3">
      <div
        onClick={() => setShowHamburgerMenu(true)}
        className="md:p-1 rounded-full transparent-blue cursor-pointer text-brand md:mr-3"
      >
        <Avatar img={loggedInUser && loggedInUser.profilePic} size={"sm"} />
      </div>
      <header className={`p-4`}>
        <h1 className="text-xl font-extrabold">{"Home"}</h1>
      </header>
    </header>
  );
};
