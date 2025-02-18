import { configureStore } from '@reduxjs/toolkit';
import authReducers from './features/auth/authSlice';
import { baseApi } from './api/baseApi';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const node_env = import.meta.env.VITE_NODE_ENV;

const persistConfig = {
    key: "auth",
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducers)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
    devTools: node_env === "development",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const persistor = persistStore(store);