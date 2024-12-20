"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import CartItem from "../types/cartItem";
import ShoppingCartType from "../types/shoppingCartType";
import { Product } from "@prisma/client";

// Define the props for the ShoppingCartProvider
interface ShoppingCartProviderProps {
  children: ReactNode;
}

// Create the shopping cart context
const ShoppingCart = createContext<ShoppingCartType | undefined>(undefined);

// Export useShoppingCart as a named export
export const useShoppingCart = () => {
  const context = useContext(ShoppingCart);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider",
    );
  }
  return context;
};

// Export ShoppingCartProvider to wrap the app or components
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("data");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("data", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          description: product.description || "",
          alt: product.alt || "Product image",
          price: product.price,
          quantity: 1,
          image: product.image || "/default-image.jpg",
        },
      ]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: quantity > 0 ? quantity : 1 }
          : product,
      ),
    );
  };

  return (
    <ShoppingCart.Provider
      value={{ cart, addToCart, removeFromCart, emptyCart, updateQuantity }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};
