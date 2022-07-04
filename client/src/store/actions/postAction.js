import { getPostsTimelineStart, getPostsTimelineSuccess, getPostsTimelineFailed} from "../slices/postSlice";
export const getTimelinePosts = async (dispatch, accessToken, axiosCustom) => {
    dispatch(getPostsTimelineStart());
    try {
        const response = await axiosCustom.get("api/post/timeline", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getPostsTimelineSuccess(response.data));
    } catch (error) {
        dispatch(getPostsTimelineFailed());
    }
}