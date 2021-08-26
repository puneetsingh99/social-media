import { lowerCase } from "../../utils/lowerCase";

export const search = (keyword, user) => {
  const username = lowerCase(user.username);
  const firstname = lowerCase(user.firstname);
  const lastname = lowerCase(user.lastname);
  const fullname = lowerCase(`${firstname} ${lastname}`);
  const lCaseKeyword = lowerCase(keyword);

  const checkOne = username.search(lCaseKeyword);
  const checkTwo = firstname.search(lCaseKeyword);
  const checkThree = lastname.search(lCaseKeyword);
  const checkFour = fullname.search(lCaseKeyword);

  if (checkOne !== -1) {
    return true;
  }

  if (checkTwo !== -1) {
    return true;
  }

  if (checkThree !== -1) {
    return true;
  }

  if (checkFour !== -1) {
    return true;
  }

  return false;
};
