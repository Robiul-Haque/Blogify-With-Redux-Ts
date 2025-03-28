import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBlog: build.query({
            query: ({ name }: { name: string }) => ({
                url: `/blog/get-all-blog?name=${name}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
        getBlog: build.query({
            query: ({ id }: { id: string }) => ({
                url: `/blog/get-blog/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
        createLike: build.mutation({
            query: (payload) => ({
                url: "/like/like",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
        deleteLike: build.mutation({
            query: (id) => ({
                url: `/like/unlike/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"],
        }),
    })
});

export const { useGetAllBlogQuery, useGetBlogQuery, useCreateLikeMutation, useDeleteLikeMutation } = userApi;