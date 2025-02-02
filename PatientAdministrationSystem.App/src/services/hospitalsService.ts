import apiClient from "../api/apiClient";
import HospitalResponse from "../types/HospitalResponse";

const hospitalsService = {
    async getHospitals(): Promise<HospitalResponse[]> {
        const hospitalsResponse = await apiClient.get(`/api/hospitals`);
        return hospitalsResponse.data;
    },

    async getHospital(hospitalId: string): Promise<HospitalResponse> {
        const hospitalsResponse = await apiClient.get(`/api/hospitals/${hospitalId}`);
        return hospitalsResponse.data;
    }


}

export default hospitalsService;