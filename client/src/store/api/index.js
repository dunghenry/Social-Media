import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/refresh', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const customAxios = (user, dispatch, loginSuccess) =>{
    const API = axios.create();
    API.interceptors.request.use(async (config) =>{
        let date = new Date();
        const decodedToken = jwt_decode(user?.accessToken);
        if(decodedToken.exp < date.getTime() / 1000){
            const data = await refreshToken();
            const newUser = {
                ...user,
                accessToken: data?.accessToken,
            }
            //check the token and login again
            dispatch(loginSuccess(newUser))
            config.headers["token"] = "Bearer " + data.accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    })
    return API;
}