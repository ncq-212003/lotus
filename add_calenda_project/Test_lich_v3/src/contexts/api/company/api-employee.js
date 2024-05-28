import LotusClient from "../lotus-api";

export const addEmployeeApi = async (companyData) => {
    try {
        const response = await LotusClient.post('/Employee/insert', companyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateEmployeeApi = async (companyData) => {
    try {
        const response = await LotusClient.put('/Employee/update', companyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listEmployeeApi = async () => {
    try {
        const response = await LotusClient.get('/Employee/all?sortByExpression=companyId');
        return response;
    } catch (error) {
        return error;
    }
}

export const findEmployeeByIdApi = async (companyId) => {
    try {
        const response = await LotusClient.get(`/Employee/${companyId}`);
        return response;
    } catch (error) {
        return error;
    }
}