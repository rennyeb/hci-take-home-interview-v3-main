import axios from 'axios';
import apiClient from "../api/apiClient";
import PatientHospitalVisitsRequest from "../types/PatientHospitalVisitsRequest";
import PatientHospitalVisitResponse from "../types/PatientHospitalVisitResponse";

const patientSearchService = {
    async getPatientHospitalVisits(patientHospitalVisitsRequest: PatientHospitalVisitsRequest): Promise<PatientHospitalVisitResponse[]> {

        //TODO does the response take a generic type?
        const patientHospitalVisitsResponse: AxiosResponse = await apiClient.get(`/api/patients/hospitalVisits`, {
            params: patientHospitalVisitsRequest
        }
        );

        return patientHospitalVisitsResponse.data;

    }
}
export default patientSearchService;