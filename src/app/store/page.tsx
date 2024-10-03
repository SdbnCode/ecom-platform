"use client";
import itemData from "../../data/itemData";
import Item from "../../types/item";
import { useShoppingCart } from "../../components/shoppingCart";

export default function Store() {
  const { addToCart } = useShoppingCart();

  return (
    <div
      id="product-section"
      className="hover: grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {itemData.map((item: Item) => (
        <div
          key={item.id}
          id={`product-card-${item.id}`}
          className="w-50 flex flex-col items-center justify-center p-4"
        >
          <img src={item.image} alt={item.alt} className="h-48 w-auto" />
          <div className="product-details">
            <h2>{item.brand}</h2>
            <p>{item.product}</p>
            <p>${item.price} CAD</p>
          </div>
          <button
            onClick={() => addToCart(item)}
            className="bg-black px-4 py-1 text-white hover:bg-zinc-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
