import axios, { AxiosInstance } from 'axios'
import { apiURL } from 'common/utils/env-config'

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})
