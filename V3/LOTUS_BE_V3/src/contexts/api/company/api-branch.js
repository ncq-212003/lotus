import LotusClient from "../lotus-api";

export const addBranchApi = async (companyData) => {
    try {
        const response = await LotusClient.post('/Branch/insert', companyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateBranchApi = async (companyData) => {
    try {
        const response = await LotusClient.put('/Branch/update', companyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listBranchApi = async () => {
    try {
        const response = await LotusClient.get('/Branch/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findBranchByIdApi = async (companyId) => {
    try {
        const response = await LotusClient.get(`/Branch/${companyId}`);
        return response;
    } catch (error) {
        return error;
    }
}