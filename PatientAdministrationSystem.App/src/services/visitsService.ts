import axios from 'axios';
import apiClient from "../api/apiClient";
import VisitResponse from "../types/VisitResponse";

const visitsService = {
    async getVisit(visitId: string): Promise<VisitResponse> {
        try {
            const visitsResponse = await apiClient.get(`/api/visits/${visitId}`);
            return visitsResponse.data;
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

export default visitsService;