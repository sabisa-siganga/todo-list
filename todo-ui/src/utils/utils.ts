/**
 * Checking the user is logged in
 */
export const checkIsLogin = () => {
  // returning true if the token exists on the local storage, otherwise false
  if (localStorage.getItem("Token") !== null) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returning a bearerToken if the user is logged in, otherwise empty string
 */
export const returnBearer = () => {
  if (checkIsLogin()) {
    return `Bearer ${localStorage.getItem("Token")}`;
  }
  return "";
};
