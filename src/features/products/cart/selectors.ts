import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { Product, CartItem } from "../../../types";

const products = (s: RootState) => s.products.items;
const cart = (s: RootState) => s.cart.items;

export const formatPrice = (v: number) => `£ ${v.toFixed(2)}`;

const calculateLine = (product: Product, qty: number) => {
  const regularTotal = product.price * qty;

  if (product.id === "bread" && qty >= 3) {
    const groups = Math.floor(qty / 3);
    const leftover = qty % 3;
    const offerTotal = groups * 2.75 + leftover * product.price;

    return {
      regularTotal,
      savings: regularTotal - offerTotal,
      finalTotal: offerTotal,
      offerDescription: "3 for £2.75",
    };
  }

  if (product.id === "butter") {
    const discountedPrice = product.price * (2 / 3);
    const finalTotal = discountedPrice * qty;

    return {
      regularTotal,
      savings: regularTotal - finalTotal,
      finalTotal,
      offerDescription: "1/3 off",
    };
  }

  return {
    regularTotal,
    savings: 0,
    finalTotal: regularTotal,
  };
};

export interface CartLine {
  product: Product;
  quantity: number;
  regularTotal: number;
  savings: number;
  finalTotal: number;
  offerDescription?: string;
}

export const selectCartLines = createSelector(
  [cart, products],
  (items: CartItem[], prods: Product[]): CartLine[] =>
    items.map((item: CartItem) => {
      const p = prods.find((x: Product) => x.id === item.productId)!;
      return {
        product: p,
        quantity: item.quantity,
        ...calculateLine(p, item.quantity),
      };
    })
);

export const selectSubtotal = createSelector(
  selectCartLines,
  (lines: CartLine[]) =>
    lines.reduce((s: number, l: CartLine) => s + l.regularTotal, 0)
);

export const selectSavings = createSelector(
  selectCartLines,
  (lines: CartLine[]) =>
    lines.reduce((s: number, l: CartLine) => s + l.savings, 0)
);

export const selectFinalTotal = createSelector(
  [selectSubtotal, selectSavings],
  (sub: number, save: number) => sub - save
);
