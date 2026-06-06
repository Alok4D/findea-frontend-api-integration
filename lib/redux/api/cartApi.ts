import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<any, string>({
      query: (cartItemId) => ({
        url: `/cart/items/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
