import axios from 'axios'
import {UserContext} from '../Contexts/UserContext'

const BASE_URL = "https://api.cfdsm.es"

export async function GetUserOperations(){
    const axiosInstance = axios.create({
        headers: {
            Authorization: localStorage.token
        },
        baseURL: BASE_URL + "/api/user/operations/current"
    })
    return await axiosInstance.get();
}

export async function GetUserHistoricalOperations(){
    const axiosInstance = axios.create({
        headers: {
            Authorization: localStorage.token
        },
        baseURL: BASE_URL + "/api/user/operations/historical"
    })
    return await axiosInstance.get();
}

export async function AddOperation(symbol, is_long, leverage, margin, limit_price = null){
    axios.get(BASE_URL + '/sanctum/csrf-cookie')
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/user/operation",
        headers: {
            Authorization: localStorage.token
        },
        params: {
            symbol: symbol,
            is_long: is_long ? 1 : 0,
            leverage, leverage,
            margin: margin,
            limit_price: limit_price
        },
        //withCredentials: true
    })
    return await axiosInstance.put();
}

export async function DeleteOperation(id){
    const axiosInstance = axios.create({
        headers: {
            Authorization: localStorage.token
        },
        params: {
            op_id: id
        },
        baseURL: BASE_URL + "/api/user/operation"
    })

    return axiosInstance.delete();
}
