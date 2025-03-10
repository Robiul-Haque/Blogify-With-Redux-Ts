import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type TAuthState = {
    id: null | string;
    name: null | string;
    email: null | string;
    role: null | string;
    token: null | string;
}

const initialState: TAuthState = {
    id: null,
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
            const { id, name, email, role, token } = action.payload;

            state.id = id;
            state.name = name;
            state.email = email;
            state.role = role;
            state.token = token;
        },
        logout: (state) => {
            state.id = null;
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