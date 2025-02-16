import { configureStore } from '@reduxjs/toolkit';
import authReducers from './features/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducers,
    },
    devTools: process.env.NODE_ENV === "development",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;