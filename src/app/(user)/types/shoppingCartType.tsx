import CartItem from "./cartItem";
import { Product } from "@prisma/client";

interface ShoppingCartType {
  cart: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default ShoppingCartType;
