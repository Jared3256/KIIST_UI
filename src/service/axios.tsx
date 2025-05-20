import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/";
const BASE_URL2 = "https://kiistcore-production.up.railway.app/api/v1";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
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
