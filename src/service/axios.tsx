import axios from "axios";

const BASE_URL = "http://localhost:3500/api/v1/";
const BASE_URL2 = "http://51.21.198.42/api/v1";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL2,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default axios.create({
  baseURL: BASE_URL2,
});
