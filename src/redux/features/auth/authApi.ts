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
            query: ({ email }) => ({
                url: `/auth/forget-password/${email}`,
                method: "POST",
            }),
        }),
        verifyOtp: build.mutation({
            query: (payload) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: payload,
            }),
        }),
        resetPassword: build.mutation({
            query: (payload) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: payload,
            }),
        }),
    })
});

export const { useLoginMutation, useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation } = authApi;