import jwt_decode from "jwt-decode";

const TOKEN_NAME = "CM_TOKEN";
const USER_INFO = "CM_USER";

const setToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

const setUserInfoLS = (info) => {
  localStorage.setItem(USER_INFO, JSON.stringify(info));
};

const removeTokenUserInfo = () => {
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(USER_INFO);
};

const getUserInfoFromLS = () => {
  const info = localStorage.getItem(USER_INFO);
  if (!info) return null;
  const { username, userProfile } = JSON.parse(info);
  return { username, userProfile };
};

const getIdFromToken = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  try {
    const id = jwt_decode(token).userId;
    return id;
  } catch (e) {
    return null;
  }
};

const Permit = (props) => {
  const token = localStorage.getItem(TOKEN_NAME);

  return <>{token ? props.children : ""}</>;
};

export {
  setToken,
  getIdFromToken,
  setUserInfoLS,
  getUserInfoFromLS,
  removeTokenUserInfo,
};
export default Permit;
