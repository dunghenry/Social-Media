import { getUsersFailed, getUsersSuccess, getUsersStart } from "../slices/userSlice";
export const getUsers = async (dispatch, accessToken, axiosCustom) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosCustom.get("api/user", {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
}
