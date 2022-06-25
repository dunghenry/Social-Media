import axios from 'axios';
import {loginStart, loginFailed, loginSuccess} from '../reducers/authSlice';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const response = await axios.post("http://localhost:4000/api/auth/login", user);
        if(response.data){
            dispatch(loginSuccess(response.data));
            navigate("/")
        }
    } catch (error) {
        dispatch(loginFailed());
    }
}