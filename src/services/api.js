import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cadastros-produtos-backend.onrender.com'
})

export default api