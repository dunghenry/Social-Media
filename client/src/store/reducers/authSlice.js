import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    errors: []
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        
    }
});

export const {} = authSlice.actions
const authReducer = authSlice.reducer;
export default authReducer