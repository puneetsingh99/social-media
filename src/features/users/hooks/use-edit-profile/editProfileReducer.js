export const editProfileReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      const newFirstName = action.payload.firstname;
      return newFirstName.length > 25
        ? state
        : { ...state, firstname: newFirstName };
    case "SET_LAST_NAME":
      const newLastName = action.payload.lastname;
      return newLastName.length > 25
        ? state
        : { ...state, lastname: newLastName };
    case "SET_BIO":
      const newBio = action.payload.bio;
      return newBio.length > 250 ? state : { ...state, bio: newBio };
    case "SET_PROFILE_PIC":
      return { ...state, newProfilePic: action.payload };
    case "SET_COVER_PIC":
      return { ...state, newCoverPic: action.payload };
    case "RESET_USER":
      return state;
    default:
      return state;
  }
};
