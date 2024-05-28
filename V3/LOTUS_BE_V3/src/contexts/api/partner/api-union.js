import LotusClient from "../lotus-api";

export const addUnionApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/Syndicate/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateUnionApi = async (data) => {
    try {
        const response = await LotusClient.put('/Syndicate/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listUnionApi = async () => {
    try {
        const response = await LotusClient.get('/Syndicate/all?sortByExpression=syndicateId');
        return response;
    } catch (error) {
        return error;
    }
}

export const findUnionByIdApi = async (syndicateId) => {
    try {
        const response = await LotusClient.get(`/Syndicate/${syndicateId}`);
        return response;
    } catch (error) {
        return error;
    }
}