"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Item from "../types/item";
import CartItem from "../types/cartItem";

// Define the ShoppingCartType interface
interface ShoppingCartType {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
}

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
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

// Export ShoppingCartProvider to wrap the app or components
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("data");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: item.id,
          brand: item.brand,
          product: item.product,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <ShoppingCart.Provider
      value={{ cart, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};
