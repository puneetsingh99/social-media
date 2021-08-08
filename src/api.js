export const API_ROOT = `https://protected-brook-51969.herokuapp.com`;
const localhost = `http://localhost:5000`;

export const API_ALL_POSTS = `${API_ROOT}/post`;
export const API_ALL_USERS = `${API_ROOT}/user`;
export const API_LOGIN = `${API_ROOT}/login`;
export const API_SIGNUP = `${API_ROOT}/user`;
export const getUserAPI = (userId) => `${API_ROOT}/user/${userId}`;
export const getPostsByUserAPI = (userId) => `${API_ROOT}/user/${userId}/posts`;
export const updateFollowersAPI = (userId) =>
  `${API_ROOT}/user/${userId}/follow`;

export const editProfileAPI = (userId) => `${API_ROOT}/user/${userId}`;
