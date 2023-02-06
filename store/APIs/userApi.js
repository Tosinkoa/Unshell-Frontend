import { fetcherApi } from "../fetcherApi"

export const userApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      updateUserAccount: build.mutation({
        query: (body) => ({ url: "account", method: "put", body }),
        invalidatesTags: ["ForUser"],
      }),
      getUserDetail: build.query({
        query: () => ({ url: "account_details" }),
        providesTags: ["ForUser"],
      }),
    }
  },
})

export const { useUpdateUserAccountMutation, useGetUserDetailQuery } = userApi
