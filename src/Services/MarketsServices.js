import axios from 'axios'

const BASE_URL = "https://api.cfdsm.es"

export async function GetTicker(){
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/ticker/24h"
    })

    return await axiosInstance.get()
}

export async function GetMarkets(){
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/markets"
    })

    return await axiosInstance.get()
}

export async function GetMarket(market){
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/market",
        params: {
            market: market
        }
    })

    return await axiosInstance.get();
}

export async function GetCandlesticks(symbol, interval){
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/klines",
        params: {
            symbol: symbol,
            interval: interval
        }
    })

    return await axiosInstance.get()
}