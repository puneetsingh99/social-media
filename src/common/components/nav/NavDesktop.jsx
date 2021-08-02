import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

export const NavDesktop = () => {
  const dispatch = useDispatch();
  return (
    <aside className="hidden sm:block sticky top-0">
      <nav>
        <h1>Nav desktop</h1>
      </nav>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </aside>
  );
};
