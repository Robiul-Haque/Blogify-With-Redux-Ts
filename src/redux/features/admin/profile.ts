import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        viewProfileInfo: build.query({
            query: () => ({
                url: "/user/get-admin",
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        updateProfileInfo: build.mutation({
            query: (payload) => ({
                url: "/user/update-admin-info",
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ["profile"],
        }),
    })
});

export const { useViewProfileInfoQuery, useUpdateProfileInfoMutation } = profileApi;