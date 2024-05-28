import LotusClient from "../lotus-api";

// Get all Market
export const ListMarket = async() => {
    try {
        const response = await LotusClient.get("/Market/all?sortByExpression=marketId");
        return response;
    }
    catch(error) {
        return error;
    }
}

// Add Market
export const AddMarket = async (data) => {
    try {
        const response = await LotusClient.post('/Market/insert', data);
        return response;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("API Error Status Code:", error.response.status);
            console.error("API Error Data:", error.response.data);
            console.error("API Error Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from server.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
        }
        console.error("Full Axios Error:", error);
        return error;
    }
}

//Edit Market
export const EditMarket = async(data) => {
    try {
        const response = await LotusClient.put("/Market/update",data);
        return response;
    }
    catch(error) {
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