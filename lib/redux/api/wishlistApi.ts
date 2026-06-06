import { baseApi } from "./baseApi";
import { ApiProduct } from "./productApi";

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
  product?: ApiProduct;
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<WishlistItem, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<void, string>({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
