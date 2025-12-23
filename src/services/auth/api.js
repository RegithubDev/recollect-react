import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://aakri.in/aakri-impact',
  //  baseURL:'http://172.22.16.70:8383/api/v1/auth',
   baseURL:'https://dev.recollect.in/api/v1/auth',

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
