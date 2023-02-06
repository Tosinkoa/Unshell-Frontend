import { fetcherApi } from "../fetcherApi"

export const productApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      getAllProducts: build.query({
        query: ({ limit, offset }) => ({ url: `all_products?limit=${limit}&offset=${offset}` }),
        providesTags: ["ForProduct"],
      }),
    }
  },
})

export const { useGetAllProductsQuery } = productApi
