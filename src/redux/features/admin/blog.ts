import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allBlog: build.query({
            query: () => ({
                url: "/blog/admin-get-all-blog",
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
        viewBlogForUpdate: build.query({
            query: (id) => ({
                url: `/blog/admin-get-blog-for-update/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
    })
});

export const { useAllBlogQuery, useViewBlogForUpdateQuery } = blogApi;