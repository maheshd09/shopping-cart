export type ProductId = "bread" | "milk" | "cheese" | "soup" | "butter";

export interface Product {
  id: ProductId;
  name: string;
  price: number;
}

export interface CartItem {
  productId: ProductId;
  quantity: number;
}
