export const persistAuthState = () => {
  let persistentAuth = window.localStorage.getItem("socialMediaLogin");
  persistentAuth = JSON.parse(persistentAuth);

  if (!persistentAuth) {
    window.localStorage.setItem(
      "socialMediaLogin",
      JSON.stringify({
        isUserLoggedIn: false,
        userId: "",
        token: "",
      })
    );
  }

  persistentAuth = window.localStorage.getItem("socialMediaLogin");

  return JSON.parse(persistentAuth);
};
