import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})
instance.interceptors.request.use((config) => {
  const t = localStorage.getItem('token')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})
export default instance

export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
