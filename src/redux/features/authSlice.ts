import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
    }
})

export const { setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;