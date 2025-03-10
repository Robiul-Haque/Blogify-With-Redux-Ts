import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog: build.mutation({
            query: (payload) => ({
                url: "/blog/admin-create-blog",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
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
        updateBlog: build.mutation({
            query: (payload) => ({
                url: "/blog/admin-update-blog",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
        deleteBlog: build.mutation({
            query: (id) => ({
                url: `/blog/admin-delete-blog/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"],
        }),
    })
});

export const { useCreateBlogMutation, useAllBlogQuery, useViewBlogForUpdateQuery, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;