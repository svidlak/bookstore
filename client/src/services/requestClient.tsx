import axios from 'axios'
const { MODE, DEV_BASE_PATH } = import.meta.env

const BASE_PATH = MODE === "development" ? DEV_BASE_PATH : window.location.origin;

const API_BASE_PATH = `${BASE_PATH}/api/v1`
export const IMAGE_BASE_PATH = BASE_PATH

export const client = axios.create({
    baseURL: API_BASE_PATH,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' }
})
