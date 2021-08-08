export const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_CAPTION":
      return { ...state, caption: action.payload };
    case "SET_FILE":
      return { ...state, photoOrVideo: action.payload };
    case "REMOVE_FILE":
      return { ...state, photoOrVideo: null };
    case "RESET_FORM":
      return { caption: "", photoOrVideo: null };
    default:
      return state;
  }
};
