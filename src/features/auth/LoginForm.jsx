import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithCredentials } from "./authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { isEmail } from "validator";

export const LoginForm = () => {
  const auth = useSelector((state) => state.auth);
  const { isUserLoggedIn } = auth.auth;
  const dispatch = useDispatch();

  console.log("AUTH FROM LOGIN FORM", auth);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(state?.from || "/");
    }
  }, [isUserLoggedIn]);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = userCredentials;
    let isInvalid = false;

    if (!email) {
      setUserCredentials({ email: "", password: "" });
      return setValidationError("Email cannot be empty");
    }

    if (!isEmail(email)) {
      setUserCredentials({ email: "", password: "" });
      return setValidationError("Please enter a valid email");
    }

    if (!password) {
      setUserCredentials({ email: "", password: "" });
      return setValidationError("Password cannot be empty");
    }

    if (isInvalid) {
      return setUserCredentials({ email: "", password: "" });
    }

    setValidationError("");
    dispatch(loginWithCredentials(userCredentials));
    setUserCredentials({ email: "", password: "" });
  };

  const inputFieldStyle = `w-full bg-black text-lg px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60`;

  return (
    <section className="h-screen flex items-start justify-center bg-black">
      <article className="w-full sm:w-350 px-2">
        <div className="py-8 pt-4">
          <FaTwitter size={40} />
        </div>
        <h1 className="text-3xl font-extrabold mb-4 tracking-wider">
          Login to Twitter
        </h1>
        <div className="h-3 my-2 text-sm flex items-center text-red-500">
          {validationError && <p>{`• ${validationError}`}</p>}
          {auth.status === "invalidForm" && <p>{`• ${auth.error}`}</p>}
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            id="email"
            className={`${inputFieldStyle}`}
            placeholder="Email"
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials((userCred) => ({
                ...userCred,
                email: e.target.value,
              }))
            }
          />
          <input
            type="password"
            id="password"
            className={inputFieldStyle}
            placeholder="Password"
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials((userCred) => ({
                ...userCred,
                password: e.target.value,
              }))
            }
          />

          <button
            type="submit"
            className={`w-full border-brand bg-brand py-3 rounded-full mb-6 font-bold`}
          >
            {auth.status === "loading" ? "Logging in..." : "Log in"}
          </button>
          <p className="text-center text-brand hover:underline cursor-pointer">
            Sign up for twitter
          </p>
        </form>
      </article>
    </section>
  );
};
