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
        viewUserProfileInfo: build.query({
            query: (id: string) => ({
                url: `/user/get-user/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        updateUserProfileInfo: build.mutation({
            query: (payload) => ({
                url: "/user/update-user-info",
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["user"],
        }),
        viewAllBookmarkBlog: build.query({
            query: (id: string) => ({
                url: `/user/get-user-bookmark-blog/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        deleteBookmarkBlog: build.mutation({
            query: ({ userId, blogId }) => ({
                url: `/user/delete-bookmark-blog?userId=${userId}&blogId=${blogId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
    })
});

export const { useGetAllBlogQuery, useGetBlogQuery, useCreateLikeMutation, useDeleteLikeMutation, useCreateCommentMutation, useAddBookmarkBlogMutation, useRemoveBookmarkBlogMutation, useViewUserProfileInfoQuery, useUpdateUserProfileInfoMutation, useViewAllBookmarkBlogQuery, useDeleteBookmarkBlogMutation, } = userApi;