import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation({
            query: (payload) => ({
                url: "/user/sign-up",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["user"],
        }),
        viewUserProfileInfo: build.query({
            query: (id: string) => ({
                url: `/user/get-user/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        updateUserProfileInfo: build.mutation({
            query: (payload) => ({
                url: "/user/update-user-info",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["user"],
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

export const { useSignupMutation, useViewUserProfileInfoQuery, useUpdateUserProfileInfoMutation, useResetPasswordMutation } = userApi;