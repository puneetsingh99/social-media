import { lowerCase } from "../../utils/lowerCase";

export const search = (keyword, user) => {
  const username = lowerCase(user.username);
  const firstname = lowerCase(user.firstname);
  const lastname = lowerCase(user.lastname);
  const lCaseKeyword = lowerCase(keyword);

  const checkOne = username.search(lCaseKeyword);
  const checkTwo = firstname.search(lCaseKeyword);
  const checkThree = lastname.search(lCaseKeyword);

  if (checkOne !== -1) {
    return true;
  }

  if (checkTwo !== -1) {
    return true;
  }

  if (checkThree !== -1) {
    return true;
  }

  return false;
};
