import axios from "axios"
import authHeader from "./auth-header"
import authHeaderImg from "./auth-header-img"

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

const createImage = (request, data) => {
  return axios.post( `${API_URL}${request}`, data, { headers: authHeaderImg()})
}

const update = (request, data) => {
  return axios.put(`${API_URL}${request}`, data, { headers: authHeader() })
}

const deleteId = (request) => {
  return axios.delete(`${API_URL}${request}`, { headers: authHeader() })
}

const getCurrentUser = () => {
  const checkUser = JSON.parse(localStorage.getItem("user"));
  // console.log(checkUser);
  if(checkUser.type === 'adm') {
      return true
  } else {
      return false
  }
};


// eslint-disable-next-line
export default {
  create,
  createImage,
  getAll,
  getId,
  update,
  deleteId,
  getCurrentUser
}