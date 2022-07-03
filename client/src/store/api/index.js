import axios from 'axios';
import jwt_decode from 'jwt-decode';
export const refreshToken = async () => {
    try {
        const res = await axios.post("api/auth/refresh", {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const customAxios = (user, dispatch, stateSuccess) => {
    const API = axios.create({});
    API.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log(data);
                const refreshUser = {
                    ...user,
                    accessToken: data?.accessToken,
                }
                //check the token and login again
                dispatch(stateSuccess(refreshUser))
                config.headers["token"] = "Bearer " + data?.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        });
    return API;
}