import LotusClient from "../lotus-api";

export const addRoomApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/DormitoryRoom/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateRoomApi = async (data) => {
    try {
        const response = await LotusClient.put('/DormitoryRoom/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listRoomApi = async () => {
    try {
        const response = await LotusClient.get('/DormitoryRoom/all?sortByExpression=dormitoryRoomId');
        return response;
    } catch (error) {
        return error;
    }
}

export const findRoomByIdApi = async (dormitoryRoomId) => {
    try {
        const response = await LotusClient.get(`/DormitoryRoom/${dormitoryRoomId}`);
        return response;
    } catch (error) {
        return error;
    }
}