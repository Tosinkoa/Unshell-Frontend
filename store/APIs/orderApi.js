import { fetcherApi } from "../fetcherApi"

export const orderApi = fetcherApi.injectEndpoints({
  endpoints(build) {
    return {
      orderItems: build.query({
        query: () => ({ url: "order_items" }),
        providesTags: ["ForOrder"],
      }),

      oneOrderItem: build.query({
        query: (orderId) => ({ url: `order_items/${orderId}` }),
        providesTags: ["ForOrder"],
      }),

      updateOrderItem: build.mutation({
        query: ({ orderId, body }) => ({ url: `order_items/${orderId}`, method: "put", body: body }),
        invalidatesTags: ["ForOrder", "ForProduct"],
      }),

      deleteOrderItem: build.mutation({
        query: (orderId) => ({ url: `order_items/${orderId}`, method: "delete" }),
        invalidatesTags: ["ForOrder", "ForProduct"],
      }),
    }
  },
})

export const { useDeleteOrderItemMutation, useOrderItemsQuery, useOneOrderItemQuery, useUpdateOrderItemMutation } =
  orderApi
