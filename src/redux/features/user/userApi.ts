import { apiSlice } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => {
        return {
          url: `/users?${query}`,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    addUser: builder.mutation({
      query: (info) => {
        return {
          url: "/users",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    editUser: builder.mutation({
      query: (info) => {
        return {
          url: `/users/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    getOverview: builder.query({
      query: () => {
        return {
          url: `/users/super-admin/overview`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetOverviewQuery,
} = userApi;
