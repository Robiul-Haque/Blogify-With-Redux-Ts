import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBlog: build.query({
            query: ({ name }: { name: string }) => ({
                url: `/blog/get-all-blog?name=${name}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
        getBlog: build.query({
            query: ({ blogId, userId }: { blogId: string, userId: string }) => ({
                url: `/blog/get-blog/${blogId}/${userId}`,
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
        createComment: build.mutation({
            query: (payload) => ({
                url: "/comment/create-comment",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
        addBookmarkBlog: build.mutation({
            query: (payload) => ({
                url: "/user/bookmark/add/blog",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
        removeBookmarkBlog: build.mutation({
            query: (payload) => ({
                url: "/user/bookmark/remove/blog",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["blog"],
        }),
        viewAllBookmarkBlog: build.query({
            query: (id: string) => ({
                url: `/user/get-user-bookmark-blog/${id}`,
                method: "GET",
            }),
            providesTags: ["blog"],
        }),
        deleteBookmarkBlog: build.mutation({
            query: ({ userId, blogId }) => ({
                url: `/user/delete-bookmark-blog?userId=${userId}&blogId=${blogId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"],
        }),
    })
});

export const { useGetAllBlogQuery, useGetBlogQuery, useCreateLikeMutation, useDeleteLikeMutation, useCreateCommentMutation, useAddBookmarkBlogMutation, useRemoveBookmarkBlogMutation, useViewAllBookmarkBlogQuery, useDeleteBookmarkBlogMutation, } = blogApi;