import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, selectAuth } from "../authSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { useSignup } from "./useSignup";

export const SignupForm = () => {
  const auth = useSelector(selectAuth);
  const { isUserLoggedIn } = auth.auth;
  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  const { formState, formDispatch, validateSignupForm } = useSignup();
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(state?.from || "/");
    }
  }, [isUserLoggedIn]);

  const handleSignup = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, username, password } = formState;
    const { isValid, message } = validateSignupForm(formState);

    if (!isValid) {
      setValidationError(message);
    }

    if (isValid) {
      console.log(auth);
      dispatch(signupUser({ firstname, lastname, email, username, password }));
      formDispatch({ type: "RST_FORM" });
    }
  };

  const inputFieldStyle = `w-full bg-dark-3 text-lg px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60`;

  return (
    <section className="min-h-screen pb-8 flex items-start justify-center bg-dark-3">
      <article className="w-full sm:w-450 px-2">
        <div className="py-4">
          <FaTwitter size={30} />
        </div>
        <h1 className="text-3xl font-extrabold  tracking-wider mb-2">
          Create an account
        </h1>
        <div className="h-3 my-2 mt-0 text-sm flex items-center text-red-500">
          {validationError !== "" && <p>{`• ${validationError}`}</p>}
          {auth.status === "failed" && <p>{`• ${auth.error}`}</p>}
        </div>
        <form onSubmit={(e) => handleSignup(e)}>
          <div className="flex gap-4">
            <input
              type="text"
              className={`${inputFieldStyle}`}
              placeholder="First name"
              value={formState.firstname}
              onChange={(e) =>
                formDispatch({ type: "SET_FNAME", payload: e.target.value })
              }
            />
            <input
              type="text"
              id="text"
              className={`${inputFieldStyle}`}
              placeholder="Last name"
              value={formState.lastname}
              onChange={(e) =>
                formDispatch({ type: "SET_LNAME", payload: e.target.value })
              }
            />
          </div>
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
            type="text"
            className={`${inputFieldStyle}`}
            placeholder="Username"
            value={formState.username}
            onChange={(e) =>
              formDispatch({ type: "SET_USRNAME", payload: e.target.value })
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

          <input
            type="password"
            className={inputFieldStyle}
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={(e) =>
              formDispatch({ type: "SET_CPASS", payload: e.target.value })
            }
          />

          <button
            type="submit"
            className={`w-full border-brand bg-brand py-3 rounded-full mb-6 font-bold`}
          >
            {auth.status === "loading" ? "Singing up..." : "Sign up"}
          </button>
          <p className="text-center text-brand ">
            Already have an account?
            <Link
              to="/login"
              className="text-link hover:underline cursor-pointer"
            >
              <span className="ml-2 font-bold">Log in</span>
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};
