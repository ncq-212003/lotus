// import LotusClient from "../lotus-api";
import axios from "axios";

export const listCitiesApi = async () => {
    try {
        const response = await axios.get('http://lotus.a.tisbase.online/api/Location/getCities');
        return response;
    } catch (error) {
        return error;
    }
}

export const listDistrictsApi = async (cityId) => {
    try {
        const response = await axios.get(`http://lotus.a.tisbase.online/api/Location/getDistricts?cityId=${cityId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const listWardsApi = async (districtId) => {
    try {
        const response = await axios.get(`http://lotus.a.tisbase.online/api/Location/getWards?districtId=${districtId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const listStreetsApi = async (districtId) => {
    try {
        const response = await axios.get(`http://lotus.a.tisbase.online/api/Location/getStreets?districtId=${districtId}`);
        return response;
    } catch (error) {
        return error;
    }
}