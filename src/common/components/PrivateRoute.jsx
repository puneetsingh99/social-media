import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkTokenExpiry } from "../utils/checkTokenExpiry";

export const PrivateRoute = ({ path, element, ...props }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isUserLoggedIn } = auth.auth;
  let loginUser = !isUserLoggedIn;

  if (isUserLoggedIn) {
    const loginObject = localStorage.getItem("socialMediaLogin");

    if (loginObject) {
      const token = JSON.parse(loginObject).token;
      const expiryTime = checkTokenExpiry(token);
      const isTokenExpired = Date.now() >= expiryTime * 1000;

      if (isTokenExpired) {
        loginUser = true;
      }
    } else {
      console.log("Login object not found in the localStorage");
    }
  }

  return loginUser ? (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  ) : (
    <Route {...props} path={path} element={element} />
  );
};
