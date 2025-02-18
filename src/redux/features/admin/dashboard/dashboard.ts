import { baseApi } from "../../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        dashboardStatics: build.query({
            query: () => ({
                url: "/user/get-admin-dashboard-statics",
                method: "GET",
            }),
        }),
    })
});

export const { useDashboardStaticsQuery } = dashboardApi;