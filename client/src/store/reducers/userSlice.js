import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    users: [],
    loading: false,
    error: false,
}


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersStart: (state) =>{
            state.loading = true;
        },
        getUsersSuccess: (state, action) =>{
            state.loading = false;
            state.users = action.payload;
        },
        getUsersFailed: (state) =>{
            state.error = true;
        }
    }
})

export const {getUsersStart, getUsersSuccess, getUsersFailed} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;