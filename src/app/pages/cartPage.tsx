import Cart from "../components/cart";
import { useEffect, useState } from "react";
import CartItem from "../types/cartItem";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("data");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div>
      <Cart cart={cart} />
    </div>
  );
}
