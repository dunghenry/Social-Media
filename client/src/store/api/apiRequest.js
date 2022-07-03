import axios from 'axios';
import {loginStart, loginFailed, loginSuccess, registerStart, registerSuccess, registerFailed, logOutStart, logOutFailed, logOutSuccess} from '../reducers/authSlice';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", user);
        if(response.data){
            dispatch(loginSuccess(response.data));
            navigate("/");
        }
    } catch (error) {
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) =>{
    dispatch(registerStart());
    try {
        const response = await axios.post("http://localhost:4000/api/auth/register", user);
        if(response.data){
            dispatch(registerSuccess());
            navigate("/login");
        }
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const logOut = async(dispatch, id, navigate, accessToken, axios) => {
    dispatch(logOutStart());
    try {
        await axios.post("http://localhost:4000/api/auth/logout", id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(logOutFailed());
    }
}