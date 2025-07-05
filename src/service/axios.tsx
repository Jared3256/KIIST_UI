import axios from "axios";
import system_data from "src/config/serverApi.config.ts";

export const axiosPrivate = axios.create({
    baseURL: system_data.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

export default axios.create({
    baseURL: system_data.BASE_URL,
});
