import axios, { Axios } from 'axios';

const server: Axios = axios.create({
  baseURL: process.env.URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

server.interceptors.request.use((config) => {
  // 요청이 multipart/form-data일 때만 Content-Type을 설정
  if (config.data instanceof FormData) {
    config.headers.set('Content-Type', 'multipart/form-data');
  }
  return config;
});

server.interceptors.response.use((response) => {
  return response;
});

export default server;
