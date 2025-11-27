import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, ProductId } from "../../../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const findIndex = (items: CartItem[], id: ProductId) =>
  items.findIndex((i) => i.productId === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductId>) {
      const id = action.payload;
      const index = findIndex(state.items, id);

      if (index === -1) {
        state.items.push({ productId: id, quantity: 1 });
      } else {
        state.items[index].quantity += 1;
      }
    },
    increment(state, action: PayloadAction<ProductId>) {
      const index = findIndex(state.items, action.payload);
      if (index !== -1) state.items[index].quantity += 1;
    },
    decrement(state, action: PayloadAction<ProductId>) {
      const index = findIndex(state.items, action.payload);
      if (index !== -1) {
        state.items[index].quantity -= 1;
        if (state.items[index].quantity <= 0) {
          state.items.splice(index, 1);
        }
      }
    },
  },
});

export const { addProduct, increment, decrement } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
