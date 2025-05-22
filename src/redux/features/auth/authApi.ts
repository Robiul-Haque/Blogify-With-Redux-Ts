import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (userLoginInfo) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: userLoginInfo,
            }),
        }),
        forgotPassword: build.mutation({
            query: (userEmail) => ({
                url: `/auth/forget-password/${userEmail}`,
                method: "POST",
            }),
        }),
    })
});

export const { useLoginMutation, useForgotPasswordMutation } = authApi;