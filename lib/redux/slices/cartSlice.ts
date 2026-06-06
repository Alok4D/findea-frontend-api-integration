import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  sku: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      const qtyToAdd = action.payload.quantity ?? 1;
      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({ ...action.payload, quantity: qtyToAdd });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("findea_cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("findea_cart", JSON.stringify(state.items));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("findea_cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("findea_cart");
      }
    },
    hydrateCart: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("findea_cart");
        if (stored) {
          try {
            state.items = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse cart from localStorage", e);
          }
        }
      }
      state.isHydrated = true;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
