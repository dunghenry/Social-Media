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
            state.loading = false;
            state.login.error = true;
        },
    },
});

export const {loginStart, loginFailed, loginSuccess} = authSlice.actions
const authReducer = authSlice.reducer;
export default authReducer