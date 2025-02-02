import apiClient from "../api/apiClient";
import VisitResponse from "../types/VisitResponse";

const visitsService = {
    async getVisit(visitId: string): Promise<VisitResponse> {
        const visitsResponse = await apiClient.get(`/api/visits/${visitId}`);
        return visitsResponse.data;
    }
}

export default visitsService;