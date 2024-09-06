import axios, { Axios } from 'axios';

const server: Axios = axios.create({
  baseURL: process.env.URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

server.interceptors.request.use((config) => {
  return config;
});

server.interceptors.response.use((response) => {
  return response;
});

export default server;
