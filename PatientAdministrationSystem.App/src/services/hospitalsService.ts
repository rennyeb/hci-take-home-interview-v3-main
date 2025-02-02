import axios from 'axios';
import apiClient from "../api/apiClient";
import HospitalResponse from "../types/HospitalResponse";

const hospitalsService = {
    async getHospitals(): Promise<HospitalResponse[]> {
        const hospitalsResponse = await apiClient.get(`/api/hospitals`);
        return hospitalsResponse.data;
    },

    async getHospital(hospitalId: string): Promise<HospitalResponse|null> {
        try {
            const hospitalsResponse = await apiClient.get(`/api/hospitals/${hospitalId}`);
            return hospitalsResponse.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 404) {
                    return null;
                }
            }
            //rethrow the error if it's not a 404
            throw error;
        }
    }


}

export default hospitalsService;