import LotusClient from "../lotus-api";

export const ListItem = async () => {
    try {
        const response = await LotusClient.get('/Item/all?sortByExpression=itemId');
        return response;
    } catch (error) {
        return error;
    }
}