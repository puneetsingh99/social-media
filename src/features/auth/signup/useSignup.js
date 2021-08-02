import React, { useReducer } from "react";
import { validateSignupForm } from "./validateSignupForm";
import { signupReducer } from "./signupReducer";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const useSignup = () => {
  const [formState, formDispatch] = useReducer(signupReducer, initialState);
  return { formState, formDispatch, validateSignupForm };
};
