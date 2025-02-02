import apiClient from "../api/apiClient";
import PatientResponse from "../types/PatientResponse";

const patientsService = {
    async getPatient(patientId: string): Promise<PatientResponse> {
        const patientsResponse = await apiClient.get(`/api/patients/${patientId}`);
        return patientsResponse.data;
    }
}

export default patientsService;