import axios from "axios";

export const API_URL = "https://underground-natassia-cravecourier-6016fb89.koyeb.app";

export const api = axios.create(
    {
        baseURL: API_URL,
        headers:{
            "Content-Type": "application/json",
        }
    }
)