import LotusClient from "../lotus-api";

// Get all Market
export const ListMarket = async () => {
    try {
        const response = await LotusClient.get("/Market/all?sortByExpression=createAt desc");
        return response;
    }
    catch (error) {
        return error;
    }
}

// Add Market
export const AddMarket = async (data) => {
    try {
        const response = await LotusClient.post('/Market/insert', data);
        return response;
    }
    catch (error) {
        return error;
    }
}

//Edit Market
export const EditMarket = async (data) => {
    try {
        const response = await LotusClient.put("/Market/update", data);
        return response;
    }
    catch (error) {
        return error;
    }
}

//Find Market by ID
export const FindMarketByID = async (marketId) => {
    try {
        const response = await LotusClient.get(`/Market/${marketId}`);
        return response;
    } catch (error) {
        return error;
    }
}