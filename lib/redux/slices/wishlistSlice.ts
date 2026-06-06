import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  isHydrated: boolean;
}

const initialState: WishlistState = {
  items: [],
  isHydrated: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("findea_wishlist", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("findea_wishlist", JSON.stringify(state.items));
      }
    },
    hydrateWishlist: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("findea_wishlist");
        if (stored) {
          try {
            state.items = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse wishlist from localStorage", e);
          }
        }
      }
      state.isHydrated = true;
    },
  },
});

export const { toggleWishlist, removeFromWishlist, hydrateWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
