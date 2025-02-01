import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7260', // NB using localhost - quick and dirty
  headers: {
    'Content-Type': 'application/json',
  },
});




export default apiClient;