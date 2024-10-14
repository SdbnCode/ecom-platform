"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Item from "../(user)/types/item";
import CartItem from "../(user)/types/cartItem";
import ShoppingCartType from "../(user)/types/shoppingCartType";

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

  const addToCart = (item: Item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: item.id,
          brand: item.brand,
          product: item.product,
          alt: item.alt,
          price: item.price,
          quantity: 1,
          image: item.image,
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

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item,
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
