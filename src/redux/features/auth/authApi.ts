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
    })
});

export const { useLoginMutation } = authApi;