import axios from "axios";

export const ListDocumentApi = async () => {
  try {
    const response = await axios.get("https://erp2.a.tisbase.online/api/v2/Location/getCities");
    return response;
  } catch (error) {
    return error;
  }
};
