import { configureStore } from '@reduxjs/toolkit';
import authReducers from './features/auth/authSlice';
import { baseApi } from './api/baseApi';

const node_env = import.meta.env.VITE_NODE_ENV;

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: node_env === "development",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;