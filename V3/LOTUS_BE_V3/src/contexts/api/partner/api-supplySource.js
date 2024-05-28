import LotusClient from "../lotus-api";

export const addSupplySourceApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/Syndicate/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateSupplySourceApi = async (data) => {
    try {
        const response = await LotusClient.put('/Syndicate/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listSupplySourceApi = async () => {
    try {
        const response = await LotusClient.get('SupplySourceType/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findSupplySourceByIdApi = async (syndicateId) => {
    try {
        const response = await LotusClient.get(`/Syndicate/${syndicateId}`);
        return response;
    } catch (error) {
        return error;
    }
}