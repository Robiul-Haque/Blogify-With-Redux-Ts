import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBlog: build.query({
            query: () => ({
                url: "/blog/get-all-blog",
                method: "GET",
            }),
        }),
    })
});

export const { useGetAllBlogQuery } = userApi;