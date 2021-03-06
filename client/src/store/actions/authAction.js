import axios from "axios";
import { loginStart, logOutSuccess, loginFailed, logOutFailed, loginSuccess, logOutStart, registerStart, registerFailed, registerSuccess} from "../slices/authSlice";
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const response = await axios.post("/api/auth/login", user);
        if (response.data) {
            dispatch(loginSuccess(response.data));
            navigate("/");
        }
    } catch (error) {
        dispatch(loginFailed());
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const response = await axios.post("api/auth/register", user);
        if (response.data) {
            dispatch(registerSuccess());
            navigate("/login");
        }
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const logOut = async (dispatch, id, navigate, accessToken, axios) => {
    dispatch(logOutStart());
    try {
        await axios.post("api/auth/logout", id, {
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