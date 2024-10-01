import { useState, useEffect } from "react";
import itemData from "../data/itemData";

interface Item {
  id: number;
  brand: string;
  product: string;
  price: number;
  image: string;
  alt: string;
}

interface CartItem {
  id: number;
  brand: string;
  product: string;
  price: number;
  quantity: number;
}

export default function ProductList() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Get cart data from localStorage
    const savedCart = localStorage.getItem("data");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
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

  return (
    <div
      id="product-section"
      className="grid gap-4 justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 hover: "
    >
      {itemData.map((item: Item) => (
        <div
          key={item.id}
          id={`product-card-${item.id}`}
          className="flex flex-col w-50 items-center justify-center p-4 "
        >
          <img src={item.image} alt={item.alt} className="w-auto h-48" />
          <div className="product-details">
            <h2>{item.brand}</h2>
            <p>{item.product}</p>
            <p>${item.price} CAD</p>
          </div>
          <button
            onClick={() => addToCart(item)}
            className="bg-black text-white px-4 py-1 hover:bg-zinc-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
