import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import logger from 'redux-logger';
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;