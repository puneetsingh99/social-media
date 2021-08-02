export const checkTokenExpiry = (token) => {
  try {
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    return tokenData.exp;
  } catch (e) {
    return null;
  }
};
