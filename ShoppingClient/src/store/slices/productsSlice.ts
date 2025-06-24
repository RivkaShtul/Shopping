import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface CartItem {
  id: string;
  category: string;
  productName: string;
  quantity: number;
  price: number; // Add price field
}

interface ProductsState {
  cart: CartItem[];
  isCheckoutOpen: boolean;
}

const initialState: ProductsState = {
  cart: [],
  isCheckoutOpen: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        category: string;
        productName: string;
        quantity: number;
        price: number; // Add price to payload
      }>
    ) => {
      const { category, productName, quantity, price } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.category === category && item.productName === productName
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          id: uuid(),
          category,
          productName,
          quantity,
          price, // Add price to cart item
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    openCheckout: (state) => {
      state.isCheckoutOpen = true;
    },
    closeCheckout: (state) => {
      state.isCheckoutOpen = false;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  openCheckout,
  closeCheckout,
  clearCart,
} = productsSlice.actions;

export type { ProductsState };
export default productsSlice.reducer;
