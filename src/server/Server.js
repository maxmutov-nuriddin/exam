import axios from 'axios'

const request = axios.create({
  baseURL: 'https://blog-backend-production-a0a8.up.railway.app/api/v1',
  timeout: 10000
})

export default request