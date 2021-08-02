export const validateLoginForm = (formState) => {
  const { email, password } = formState;
  let isValid = true;
  let message = "";

  if (email === "") {
    isValid = false;
    message = "Email field cannot be empty";
    return { isValid, message };
  }

  if (password === "") {
    isValid = false;
    message = "Password field cannot be empty";
    return { isValid, message };
  }

  return { isValid, message };
};
