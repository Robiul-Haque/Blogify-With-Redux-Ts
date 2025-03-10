import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // Get the token from state and send it header authorization in every request.
        const token = (getState() as RootState).auth.token;
        if (token) headers.set("Authorization", token);
        return headers;
    },
})

const baseQueryWithRefreshToken = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions);

    // If the request is unauthorized, check if the access token is expired send refresh token for new access token.
    if ((result as any)?.error?.data?.error?.statusCode === 401) {
        // Sending refresh token
        const res = await fetch(`${baseUrl}/auth/refresh-token`, {
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();

        if (data?.data?.accessToken) {
            // Set the new access token in the user state
            const { name, email, role } = (api.getState() as RootState).auth;
            api.dispatch(setUser({ name, email, role, token: data?.data?.accessToken }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            // Logout the user if refresh token is expired
            api.dispatch(logout());
        }
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["dashboard", "blog", "user", "profile"],
    endpoints: () => ({}),
})