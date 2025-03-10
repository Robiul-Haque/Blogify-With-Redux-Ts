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
    })
});

export const { useViewProfileInfoQuery } = profileApi;