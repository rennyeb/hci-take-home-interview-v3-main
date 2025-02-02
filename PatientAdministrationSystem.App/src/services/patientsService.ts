import axios from 'axios';
import apiClient from "../api/apiClient";
import PatientResponse from "../types/PatientResponse";

const patientsService = {
    async getPatient(patientId: string): Promise<PatientResponse> {
        try {
            const patientsResponse = await apiClient.get(`/api/patients/${patientId}`);
            return patientsResponse.data;
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

export default patientsService;