import axios from "axios"

const BASE_URL = "https://api.cfdsm.es"

export async function LoginService(email, password){
    getCSRF()
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/auth/login",
        params: {
            email: email,
            password: password
        }
    })

    const response = await axiosInstance.post()
    return response
}

export async function RegisterService(username, email, password, password_confirmation, name, surname){
    getCSRF()
    const axiosInstance = axios.create({
        baseURL: BASE_URL + "/api/auth/register",
        params: {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            name: name,
            surname: surname
        }
    })

    const response = await axiosInstance.post()
    return response
}

function getCSRF(){
    axios.get(BASE_URL + '/sanctum/csrf-cookie')
}

export async function GetUserData(){
    const axiosInstance = axios.create({
        headers: {
            Authorization: localStorage.token
        },
        baseURL: BASE_URL + "/api/me"
    })
    return await axiosInstance.get();
}