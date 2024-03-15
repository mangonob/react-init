import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 15_000,
});

export default request;
