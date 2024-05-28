import LotusClient from "../lotus-api";

// Get all EducationLevel
export const ListEducationLevel = async() => {
    try {
        const response = await LotusClient.get("/EducationLevel/all?sortByExpression=createAt desc");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add EducationLevel
export const AddEducationLevel = async(data) => {
    try {
        const respone = await LotusClient.post("/EducationLevel/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit EducationLevel
export const EditEducationLevel = async(data) => {
    try {
        const response = await LotusClient.put("/EducationLevel/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find EducationLevel by ID
export const FindEducationLevelByID = async (educationLevelId) => {
    try {
        const response = await LotusClient.get(`/EducationLevel/${educationLevelId}`);
        return response;
    } catch (error) {
        return error;
    }
}