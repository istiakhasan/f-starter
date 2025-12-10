import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    getUsers: build.query({
      query: (data) => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const { useCreateUserMutation,useGetUsersQuery } = userApi;
