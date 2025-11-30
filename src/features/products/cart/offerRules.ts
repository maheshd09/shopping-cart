import type { Product } from "../../../types";
import type { CartItem } from "../../../types";

export interface OfferResult {
  savings: number;
  finalTotal: number;
  description?: string;
}

export interface OfferRule {
  productId: string;
  priority: number;
  apply: (
    product: Product,
    quantity: number,
    cartItems: CartItem[]
  ) => OfferResult | null;
}

export const offerRules: OfferRule[] = [
   {
    productId: "bread",
    priority: 2,
    apply: (product, qty) => {
      if (qty < 2) return null;

      const regularTotal = qty * product.price;
      const groups = Math.floor(qty / 2);
      const leftover = qty % 2;
      const offerTotal = groups * 2.75 + leftover * product.price;

      return {
        savings: regularTotal - offerTotal,
        finalTotal: offerTotal,
        description: "2 for £2.75",
      };
    },
  },
 {
    productId: "bread",
    priority: 1,  
    apply: (product, qty, cartItems) => {
      const soupItem = cartItems.find((c) => c.productId === "soup");
      const soupQty = soupItem?.quantity ?? 0;
      if (soupQty <= 0) return null;

      const eligible = Math.min(qty, soupQty);
      if (eligible <= 0) return null;

      const regular = qty * product.price;
      const savings = eligible * (product.price * 0.5);
      const finalTotal = regular - savings;

      return {
        savings,
        finalTotal,
        description: `Half price for ${eligible} Bread(s) (for Soup)`,
      };
    },
  },
 {
    productId: "butter",
    priority: 1,
    apply: (product, qty) => {
      const regular = qty * product.price;
      const discounted = regular * (2 / 3);

      return {
        savings: regular - discounted,
        finalTotal: discounted,
        description: "1/3 off",
      };
    },
  },
 {
    productId: "soup",
    priority: 1,
    apply: (product, qty) => {
      if (qty < 2) return null;

      const freeItems = Math.floor(qty / 2); // buy2get1
      const savings = freeItems * product.price;
      const finalTotal = qty * product.price - savings;

      return {
        savings,
        finalTotal,
        description: "Buy 2 Get 1 Free",
      };
    },
  },
 {
    productId: "milk",
    priority: 1,
    apply: (product, qty) => {
      const regular = qty * product.price;
      const finalTotal = regular * 0.8;

      return {
        savings: regular - finalTotal,
        finalTotal,
        description: "20% Off",
      };
    },
  },
];
