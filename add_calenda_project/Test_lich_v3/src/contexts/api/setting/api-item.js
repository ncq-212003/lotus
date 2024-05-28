import axios from "axios";

export const ListItem = async() => {
    var url = 'http://lotus.a.tisbase.online/api/v1/Job/all?sortByExpression=jobID';
    try{
        const response = await axios.get(url);
        return response;
    }
    catch (error){
        return(error)
    }
}