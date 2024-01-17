import axios from 'axios'

const BASE_URL = 'http://localhost:3002/auth'

const StartupApi = {
  async register(userDetails) {
    const response = await axios.post(`${BASE_URL}/register`, userDetails)
    return response.data
  },
  // other startup API functions...
}

const InvestorApi = {
  async register(userDetails) {
    const response = await axios.post(`${BASE_URL}/login`, userDetails)
    return response.data
  },
  // other investor API functions...
}

const AdminApi = {
  async register(userDetails) {
    const response = await axios.post(`${BASE_URL}/superadmin`, userDetails)
    return response.data
  },
  // other admin API functions...
}

export { StartupApi, InvestorApi, AdminApi }
