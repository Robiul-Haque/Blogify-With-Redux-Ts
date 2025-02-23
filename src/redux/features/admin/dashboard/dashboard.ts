import { baseApi } from "../../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        dashboardStatics: build.query({
            query: () => ({
                url: "/user/get-admin-dashboard-statics",
                method: "GET",
            }),
        }),
        viewBlog: build.query({
            query: (id) => ({
                url: `/blog/admin-get-blog/${id}`,
                method: "GET",
            }),
        }),
    })
});

export const { useDashboardStaticsQuery, useViewBlogQuery } = dashboardApi;