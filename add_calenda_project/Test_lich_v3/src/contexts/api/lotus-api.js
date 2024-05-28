import axios from 'axios';

const LotusClient = axios.create({
  baseURL: 'http://lotus.a.tisbase.online/api/v1',
  timeout: 8000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

export default LotusClient;