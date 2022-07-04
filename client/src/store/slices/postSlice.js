import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    postsTimeline: [],
    loading: true,
    error: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        getPostsTimelineStart: (state) =>{
            state.loading = true;
        },
        getPostsTimelineSuccess: (state, action) =>{
            state.loading = false;
            state.postsTimeline = action.payload;
        },
        getPostsTimelineFailed: (state) =>{
            state.error = true;
        }
    }
});

export const {getPostsTimelineStart, getPostsTimelineSuccess, getPostsTimelineFailed} = postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;