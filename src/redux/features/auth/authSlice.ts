import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type TAuthState = {
    id: null | string;
    name: null | string;
    email: null | string;
    image: null | string;
    role: null | string;
    token: null | string;
}

const initialState: TAuthState = {
    id: null,
    name: null,
    email: null,
    image: null,
    role: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, email, image, role, token } = action.payload;

            state.id = id ?? state.id;
            state.name = name ?? state.name;
            state.email = email ?? state.email;
            state.image = image ?? state.image;
            state.role = role ?? state.role;
            state.token = token ?? state.token;
        },
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.image = null;
            state.role = null;
            state.token = null;
        },
        forgotPPasswordEmail: (state, action) => {
            const { email } = action.payload;
            state.email = email;
        }
    }
})

export const { setUser, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;