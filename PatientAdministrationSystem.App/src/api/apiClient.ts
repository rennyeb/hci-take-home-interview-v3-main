import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:5173', // Replace with your API's base URL - TODO quick and dirty


  // baseURL: 'https://api.github.com', //TODO temp


  headers: {
    'Content-Type': 'application/json',
  },
});


//TODO remove
type githubFoundUser = {
  login: string;
  id: number;
 }
 
//TODO remove
type githubUser = {
   login: string;
   id: number;
   followers: number;
 }



export default apiClient;