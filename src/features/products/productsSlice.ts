import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    { id: "bread", name: "Bread", price: 1.1 },
    { id: "milk", name: "Milk", price: 0.5 },
    { id: "cheese", name: "Cheese", price: 0.9 },
    { id: "soup", name: "Soup", price: 0.6 },
    { id: "butter", name: "Butter", price: 1.2 },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
