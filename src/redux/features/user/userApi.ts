import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBlog: build.query({
            query: ({ name }: { name: string }) => ({
                url: `/blog/get-all-blog?name=${name}`,
                method: "GET",
            }),
        }),
        getBlog: build.query({
            query: ({ id }: { id: string }) => ({
                url: `/blog/get-blog/${id}`,
                method: "GET",
            }),
        }),
    })
});

export const { useGetAllBlogQuery, useGetBlogQuery } = userApi;