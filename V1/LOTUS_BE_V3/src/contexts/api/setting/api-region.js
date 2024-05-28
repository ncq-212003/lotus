import LotusClient from "../lotus-api";

export const addRegionApi = async (regionData) => {
    try {
        const response = await LotusClient.post('/Position/insert', regionData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listRegionApi = async () => {
    try {
        const response = await LotusClient.get('/Position/all?sortByExpression=desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findRegionApi = async (positionId) => {
    try {
        const response = await LotusClient.get(`/Position/${positionId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateRegionApi = async (regionData) => {
    try {
        const response = await LotusClient.put('/Position/update', regionData);
        return response;
    } catch (error) {
        return error;
    }
}   