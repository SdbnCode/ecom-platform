import CartItem from "./cartItem";
import Product from "@/prisma/client";

interface ShoppingCartType {
  cart: CartItem[];
  addToCart: (product: product) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export default ShoppingCartType;
