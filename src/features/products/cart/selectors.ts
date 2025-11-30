import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { Product, CartItem } from "../../../types";
import { offerRules } from "./offerRules";

const products = (s: RootState) => s.products.items;
const cart = (s: RootState) => s.cart.items;

export const formatPrice = (v: number) => `£ ${v.toFixed(2)}`;

 const applyBestOffer = (
  product: Product,
  quantity: number,
  cartItems: CartItem[]
) => {
  const regularTotal = product.price * quantity;

    const rules = offerRules
    .filter((r) => r.productId === product.id)
    .sort((a, b) => a.priority - b.priority);

  if (rules.length === 0) {
    return {
      regularTotal,
      savings: 0,
      finalTotal: regularTotal,
      offerDescription: undefined,
    };
  }

   let best: { savings: number; finalTotal: number; description?: string } | null =
    null;

  for (const rule of rules) {
    const result = rule.apply(product, quantity, cartItems);
    if (!result) continue;

    if (!best || result.savings > best.savings) {
      best = result;
    }
  }

  if (!best) {
    return {
      regularTotal,
      savings: 0,
      finalTotal: regularTotal,
      offerDescription: undefined,
    };
  }

  return {
    regularTotal,
    savings: best.savings,
    finalTotal: best.finalTotal,
    offerDescription: best.description,
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
    items.map((item) => {
      const product = prods.find((p) => p.id === item.productId)!;

      const applied = applyBestOffer(product, item.quantity, items);

      return {
        product,
        quantity: item.quantity,
        ...applied,
      };
    })
);

export const selectSubtotal = createSelector(
  selectCartLines,
  (lines) => lines.reduce((s, l) => s + l.regularTotal, 0)
);

export const selectSavings = createSelector(
  selectCartLines,
  (lines) => lines.reduce((s, l) => s + l.savings, 0)
);

export const selectFinalTotal = createSelector(
  [selectSubtotal, selectSavings],
  (subtotal, savings) => subtotal - savings
);
