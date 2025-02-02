import axios, { AxiosInstance } from 'axios';
import apiClient from "../api/apiClient";

// const apiClient: AxiosInstance = axios.create({
//   baseURL: 'https://localhost:7260', // NB using localhost - quick and dirty
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const hospitalsService={
    async getHospitals(){
        const hospitalsResponse = await apiClient.get(`/api/hospitals`);
        //TODO map to a type - HospitalResponse[] - how?
        return hospitalsResponse.data;
    }

    //TODO a getHospitalById method
}


export default hospitalsService;


//TODO which bits is this layer supposed to handle?  Why tsx?  Perhaps it's per page?  Look up an exmample of how to do "multiple pages" in react 



//  try {
//         const hospitalsResponse: AxiosResponse = await client.get(`/api/hospitals`);

//         setResponseValue(hospitalsResponse.data.name)

//       } catch (err) {
//         //TODO display an error on screen
//         console.log(err);
//       }
