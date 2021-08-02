import { isEmail } from "validator";

export const validatePassword = (password) => {
  const capitalLetterPattern = new RegExp("[A-Z]");
  const digitPattern = new RegExp("[0-9]");
  const specialCharacterPattern = new RegExp("[#?!@$%^&*-]");

  const containsCapitalLetter = capitalLetterPattern.test(password);
  const containsDigit = digitPattern.test(password);
  const containsSpecialCharacter = specialCharacterPattern.test(password);

  if (password.length < 6) {
    return "Password must be atleast 6 characters long";
  }

  if (!containsCapitalLetter) {
    return "Password must contain capital letter";
  }

  if (!containsDigit) {
    return "Password must contain number";
  }

  if (!containsSpecialCharacter) {
    return "Password must contain special character";
  }

  return "pass";
};

export const validateSignupForm = (formState) => {
  const { firstname, lastname, email, username, password, confirmPassword } =
    formState;
  let isValid = true;
  let message = "";

  if (firstname === "") {
    isValid = false;
    message = "First name field cannot be empty";
    return { isValid, message };
  }

  if (lastname === "") {
    isValid = false;
    message = "Last name field cannot be empty";
    return { isValid, message };
  }

  if (email === "") {
    isValid = false;
    message = "Email field cannot be empty";
    return { isValid, message };
  }

  if (!isEmail(email)) {
    isValid = false;
    message = "Please enter a valid email";
    return { isValid, message };
  }

  if (username === "") {
    isValid = false;
    message = "Username field cannot be empty";
    return { isValid, message };
  }

  if (password === "") {
    isValid = false;
    message = "Password field cannot be empty";
    return { isValid, message };
  }

  if (confirmPassword === "") {
    isValid = false;
    message = "Confirm Password field cannot be empty";
    return { isValid, message };
  }

  if (username.length > 20) {
    isValid = false;
    message = "Username cannot be longer than 20 characters";
    return { isValid, message };
  }

  if (firstname.length > 25) {
    isValid = false;
    message = "Firstname cannot be longer than 25 characters";
    return { isValid, message };
  }

  if (lastname.length > 25) {
    isValid = false;
    message = "Lastname cannot be longer than 25 characters";
    return { isValid, message };
  }

  const isPasswordValid = validatePassword(password);

  if (isPasswordValid !== "pass") {
    isValid = false;
    message = isPasswordValid;
    return { isValid, message };
  }

  if (!(password === confirmPassword)) {
    isValid = false;
    message = "Passwords do not match";
    return { isValid, message };
  }

  return { isValid, message };
};
