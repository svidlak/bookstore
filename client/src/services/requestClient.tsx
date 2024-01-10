import axios from 'axios'

const API_BASE_PATH = 'http://localhost:3000/api/v1'
export const IMAGE_BASE_PATH = 'http://localhost:3000'

export const client = axios.create({
    baseURL: API_BASE_PATH,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' }
})
