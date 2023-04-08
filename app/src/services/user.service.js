import axios from "axios"


const API_URL = "http://project-tcc.test/restaurant-api/public"

const getAll = (request) => {
  return axios.get( `${API_URL}${request}`)
}

const getId = (request) => {
  return axios.get( `${API_URL}${request}`)
}

const create = (request, data) => {
  return axios.post( `${API_URL}${request}`, data)
}

// eslint-disable-next-line
export default {
  create,
  getAll,
  getId,
}