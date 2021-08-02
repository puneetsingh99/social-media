import React, { useReducer } from "react";
import { validateLoginForm } from "./validateLoginForm";
import { loginReducer } from "./loginReducer";

const initialState = { email: "", password: "" };

export const useLogin = () => {
  const [formState, formDispatch] = useReducer(loginReducer, initialState);
  return { formState, formDispatch, validateLoginForm };
};
