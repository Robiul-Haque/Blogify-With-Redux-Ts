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
        // viewBlog: build.query({
        //     query: (id) => ({
        //         url: `/blog/admin-get-blog/${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["dashboard"],
        // }),
    })
});

export const { useAllBlogQuery } = blogApi;