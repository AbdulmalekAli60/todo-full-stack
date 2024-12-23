import axios from "axios";

const REGISTER_API_URL = "http://localhost:8080/api/auth/register";

const LOG_IN_API_URL = "http://localhost:8080/api/auth/login";

export const register = (newUserInfoObj) =>
  axios.post(REGISTER_API_URL, newUserInfoObj);

export const login = (loginObj) => {
  console.log("Sending login request to:", LOG_IN_API_URL);
  return axios.post(LOG_IN_API_URL, loginObj);
};

export const storeToken = (token) => {
  try {
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.error("Error storing token:", error);
    return false;
  }
};

export const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    console.log("retrieved token:", token);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// check if user is logged in
export const isLoggedIn = () => {
  return getToken() !== null;
};

// store in session storage so it can have an expiration date
export const savedLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");

  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

export const logout = () => {
  clearToken();
  sessionStorage.clear();
  // window.location.reload(false)
};

export const clearToken = () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.error("Error clearing token:", error);
    return false;
  }
};

//check if loged in use is admin or not
export const isAdmin = () => {
    let role = sessionStorage.getItem("role");
    // Check if role is either ROLE_admin OR ROLE_A
    return role != null && (role === "ROLE_admin" || role === "ROLE_A");

};
