import { useState, useEffect } from "react";
import itemData from "../data/itemData";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

interface CartItem {
  id: number;
  name: string;
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
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ]);
    }
  };

  return (
    <div id="product-section">
      {itemData.map((item: Item) => (
        <div key={item.id} className="product-card">
          <img src={item.image} alt={item.alt} />
          <div className="product-details">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
          </div>
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
