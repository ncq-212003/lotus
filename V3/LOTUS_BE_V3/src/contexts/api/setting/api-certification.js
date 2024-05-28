import LotusClient from "../lotus-api";

export const addCertificationApi = async (certificationData) => {
    try {
        const response = await LotusClient.post('/CertificationCompany/insert', certificationData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCertificationApi = async () => {
    try {
        const response = await LotusClient.get('/CertificationCompany/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCertificationApi = async (certificationcompanyId) => {
    try {
        const response = await LotusClient.get(`/CertificationCompany/${certificationcompanyId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCertificationApi = async (certificationData) => {
    try {
        const response = await LotusClient.put('/CertificationCompany/update', certificationData);
        return response;
    } catch (error) {
        return error;
    }
}