import CartItem from "./cartItem";
import Item from "./item";

interface ShoppingCartType {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export default ShoppingCartType;
