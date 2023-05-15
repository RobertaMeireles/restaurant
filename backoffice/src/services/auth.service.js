import axios from "axios"

const API_URL = "http://project-tcc.test/restaurant-api/public"

const login = (username, password) => {
  return axios
    .post(API_URL + "/", {
        username,
        password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
        return true;
      } else {
        return false
      }
    })
};

const logout = () => {
  localStorage.removeItem("user")
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
};

// eslint-disable-next-line
export default {
  login,
  logout,
  getCurrentUser,
};