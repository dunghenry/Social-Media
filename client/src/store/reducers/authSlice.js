import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: false
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = false;
        },
        loginFailed: (state) => {
            state.error = true;
        },
        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state) => {
            state.loading = false;
        },
        registerFailed: (state) => {
            state.error = true;
        },
        logOutStart: (state) => {
            state.loading = true;
        },
        logOutSuccess: (state) => {
            state.loading = false;
            state.user = null;
        },
        logOutFailed: (state) => {
            state.error = true;
        }
    },
});

export const {loginStart, loginFailed, loginSuccess, registerFailed, registerSuccess, registerStart, logOutStart, logOutSuccess, logOutFailed} = authSlice.actions
const authReducer = authSlice.reducer;
export default authReducer;