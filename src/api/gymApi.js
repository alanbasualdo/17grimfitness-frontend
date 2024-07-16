import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { SERVER } = getEnv();

const gymApi = axios.create({
  baseURL: "http://localhost:3000",
});

gymApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem("token"),
    // 'Content-Type': 'multipart/form-data'
  };

  return config;
});

export default gymApi;
