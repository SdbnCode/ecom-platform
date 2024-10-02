"use client";

import itemData from "../../data/itemData";
import Item from "../../types/item";
import { useShoppingCart } from "../../components/shoppingCart";

export default function Store() {
  const { addToCart } = useShoppingCart();

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
