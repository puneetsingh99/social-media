import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithCredentials, selectAuth } from "../authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { LogoSvg } from "../../../assets/LogoSvg";

export const LoginForm = () => {
  const auth = useSelector(selectAuth);
  const { isUserLoggedIn } = auth.auth;
  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  const { formState, formDispatch, validateLoginForm } = useLogin();
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(state?.from || "/");
    }
  }, [isUserLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formState;
    const { isValid, message } = validateLoginForm(formState);

    if (!isValid) {
      setValidationError(message);
    }

    if (isValid) {
      console.log(auth);
      dispatch(loginWithCredentials({ email, password }));
      formDispatch({ type: "RST_FORM" });
    }
  };

  const guestLogin = (e) => {
    e.preventDefault();
    const credentials = { email: "puneet@gmail.com", password: "Puneet@123" };
    const { isValid, message } = validateLoginForm(credentials);

    if (!isValid) {
      setValidationError(message);
    }

    if (isValid) {
      dispatch(loginWithCredentials(credentials));
      formDispatch({ type: "RST_FORM" });
    }
  };

  const inputFieldStyle = `w-full bg-dark-3 text-lg px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60`;

  return (
    <section className="min-h-screen pb-8 flex items-start justify-center bg-dark-3">
      <article className="w-full sm:w-350 px-2">
        <div className="py-8 pt-4">
          <LogoSvg size={40} />
        </div>
        <h1 className="text-3xl font-extrabold mb-4 tracking-wider">
          Log in to Grow
        </h1>
        <div className="h-3 my-2 text-sm flex items-center text-red-500">
          {validationError && <p>{`• ${validationError}`}</p>}
          {auth.status === "failed" && <p>{`• ${auth.error}`}</p>}
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            className={`${inputFieldStyle}`}
            placeholder="Email"
            value={formState.email}
            onChange={(e) =>
              formDispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
          <input
            type="password"
            className={inputFieldStyle}
            placeholder="Password"
            value={formState.password}
            onChange={(e) =>
              formDispatch({ type: "SET_PASS", payload: e.target.value })
            }
          />

          <button
            name="login"
            type="submit"
            className={`w-full border-brand bg-brand py-3 rounded-full mb-6 font-bold`}
          >
            {auth.status === "loading" ? "Logging in..." : "Log in"}
          </button>
          <button
            name="guest login"
            type="button"
            onClick={guestLogin}
            className={`w-full border-brand bg-brand py-3 rounded-full mb-6 font-bold`}
          >
            {auth.status === "loading" ? "Logging in..." : "Log in as Guest"}
          </button>
          <Link to={`/signup`} className="text-link">
            <p className="text-center text-brand hover:underline cursor-pointer">
              Sign up for Grow
            </p>
          </Link>
        </form>
      </article>
    </section>
  );
};
