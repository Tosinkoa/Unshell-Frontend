import { fetcherApi } from "../fetcherApi"

export const authApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      loginUser: build.mutation({
        query: (body) => ({ url: "login", method: "post", body }),
        invalidatesTags: ["ForAuth"],
      }),

      getAuth: build.query({
        query: () => ({ url: "auth" }),
        providesTags: ["ForAuth"],
      }),

      logoutUser: build.mutation({
        query: () => ({ url: "logout" }),
        invalidatesTags: ["ForAuth"],
      }),
    }
  },
})

export const { useLoginUserMutation, useGetAuthQuery, useLogoutUserMutation } = authApi
