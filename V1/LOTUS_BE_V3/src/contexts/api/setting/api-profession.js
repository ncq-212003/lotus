import LotusClient from "../lotus-api";

// Get all profession
export const ListProfession = async() => {
    try {
        const response = await LotusClient.get("/Job/all?sortByExpression=jobId");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add profession
export const AddProfession = async(data) => {
    try {
        const respone = await LotusClient.post("/Job/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit profession
export const EditProfession = async(data) => {
    try {
        const response = await LotusClient.put("/Job/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find profession by ID
export const FindProfessionByID = async (jobId) => {
    try {
        const response = await LotusClient.get(`/Job/${jobId}`);
        return response;
    } catch (error) {
        return error;
    }
}