const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const signupReducer = (state, action) => {
  switch (action.type) {
    case "SET_FNAME":
      return { ...state, firstname: action.payload };
    case "SET_LNAME":
      return { ...state, lastname: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_USRNAME":
      return { ...state, username: action.payload };
    case "SET_PASS":
      return { ...state, password: action.payload };
    case "SET_CPASS":
      return { ...state, confirmPassword: action.payload };
    case "RST_FORM":
      return initialState;

    default:
      const message = "Invalid signup form field";
      console.log(message);
      throw new Error(message);
  }
};
