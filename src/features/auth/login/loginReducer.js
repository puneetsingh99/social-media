const initialState = {
  email: "",
  password: "",
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASS":
      return { ...state, password: action.payload };
    case "RST_FORM":
      return initialState;

    default:
      const message = "Invalid login form field";
      console.log(message);
      throw new Error(message);
  }
};
