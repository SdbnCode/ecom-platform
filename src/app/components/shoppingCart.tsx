"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  use,
} from "react";
import Item from "../types/item";
import CartItem from "../types/cartItem";

interface ShoppingCartType {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
}

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const ShoppingCart = createContext<ShoppingCartType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShoppingCart);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("data");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("data", JSON.stringify(cart));
    }
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
