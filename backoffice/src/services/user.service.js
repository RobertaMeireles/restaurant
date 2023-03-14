import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "https://project-tcc.test/restaurant-api/public"

const getAll = (request) => {
  return axios.get( `${API_URL}${request}`, { headers: authHeader() })
}

const getId = (request) => {
  return axios.get( `${API_URL}${request}`, { headers: authHeader() })
}

const create = (request, data) => {
  return axios.post( `${API_URL}${request}`, data, { headers: authHeader() })
}

const update = (request, data) => {
  return axios.put(`${API_URL}${request}`, data, { headers: authHeader() })
}

const deleteId = (request) => {
  return axios.delete(`${API_URL}${request}`, { headers: authHeader() })
}

// const userLogged = () => {
//   const checkUser = JSON.parse(localStorage.getItem("user"));
//   console.log(checkUser);
//   if(!checkUser) {
//       return true
//   } else {
//     return false
//   }
// };

const getCurrentUser = () => {
  const checkUser = JSON.parse(localStorage.getItem("user"));
  console.log(checkUser);
  if(checkUser.type === 'adm') {
      return true
  } else {
      return false
  }
};


// eslint-disable-next-line
export default {
  create,
  getAll,
  getId,
  update,
  deleteId,
  getCurrentUser
}