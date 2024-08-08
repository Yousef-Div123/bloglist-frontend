import axios from 'axios'
import BASE_URL from './config'

const baseUrl = BASE_URL + "/api/blogs"
let token = null

const setToken = (newToken) =>{
  if(newToken){
    token = `Bearer ${newToken}`
  }else{
    token = null
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (data) =>{
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, data, config)
  return response.data
}


export default { 
  getAll,
  setToken,
  create
 }