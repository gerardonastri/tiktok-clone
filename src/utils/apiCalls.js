import axios from "axios"

const  BASE_URL = "https://tik-tok-clone-api.herokuapp.com/api/";

export const axiosReq = axios.create({
    baseURL:  BASE_URL
})