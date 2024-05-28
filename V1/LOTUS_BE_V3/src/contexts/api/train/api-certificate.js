import LotusClient from "../lotus-api";

// Get all Certificate
export const ListCertificate = async() => {
    try {
        const response = await LotusClient.get("/Certificate/all?sortByExpression=jobId");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add Certificate
export const AddCertificate = async(data) => {
    try {
        const respone = await LotusClient.post("/Certificate/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit Certificate
export const EditCertificate = async(data) => {
    try {
        const response = await LotusClient.put("/Certificate/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find Certificate by ID
export const FindCertificateByID = async (certificateId) => {
    try {
        const response = await LotusClient.get(`/Certificate/${certificateId}`);
        return response;
    } catch (error) {
        return error;
    }
}