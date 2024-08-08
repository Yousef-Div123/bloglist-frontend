import axios from 'axios'
import BASE_URL from './config'

const loginURL = BASE_URL + "/api/login"

const login = async credentials => {
  const response = await axios.post(loginURL, credentials)
  return response.data
}

export default login 