import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type TAuthState = {
    name: null | string;
    email: null | string;
    role: null | string;
    token: null | string;
}

const initialState: TAuthState = {
    name: null,
    email: null,
    role: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { name, email, role, token } = action.payload;

            state.name = name;
            state.email = email;
            state.role = role;
            state.token = token;
        },
        logout: (state) => {
            state.name = null;
            state.email = null;
            state.role = null;
            state.token = null;
        }
    }
})

export const { setUser, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;