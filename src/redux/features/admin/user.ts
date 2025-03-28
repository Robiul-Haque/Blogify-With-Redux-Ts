import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        AllUser: build.query({
            query: ({ userFilter, search }: { userFilter: string, search: string }) => ({
                url: `/user/admin-get-all-user?status=${userFilter}&search=${search}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        BlockUser: build.mutation({
            query: (data: { id: string, status: boolean }) => ({
                url: "/user/admin-user-blocked",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        DeleteUser: build.mutation({
            query: (id: string) => ({
                url: `/user/admin-delete-user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
    })
});

export const { useAllUserQuery, useBlockUserMutation, useDeleteUserMutation } = userApi;