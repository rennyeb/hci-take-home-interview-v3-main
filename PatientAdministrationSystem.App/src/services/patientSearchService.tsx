import axios from 'axios';
import apiClient from "../api/apiClient";
import PatientHospitalVisitsRequest from "../types/PatientHospitalVisitsRequest";
import PatientHospitalVisitResponse from "../types/PatientHospitalVisitResponse";

const patientSearchService = {
    async getPatientHospitalVisits(patientHospitalVisitsRequest: PatientHospitalVisitsRequest): Promise<PatientHospitalVisitResponse[]> {


        try {
            const patientHospitalVisitsResponse = await apiClient.get(`/api/patients/hospitalVisits`, {
                params: patientHospitalVisitsRequest
            }
            );

            return patientHospitalVisitsResponse.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 400) {

                    const invalidRequestError: any = new Error();

                    //push in the error message
                    invalidRequestError.apiMessage = error?.response?.data
                    invalidRequestError.cause = error

                    throw invalidRequestError
                }
            }

            //otherwise rethrow any other type of error
            throw error;

        }

    }
}
export default patientSearchService;