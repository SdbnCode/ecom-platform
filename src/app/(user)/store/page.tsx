"use client";
import itemData from "../../data/itemData";
import Item from "../types/item";
import { useShoppingCart } from "../../components/shoppingCart";
import Image from "next/image";

export default function Store() {
  const { addToCart } = useShoppingCart();

  return (
    <div
      id="product-section"
      className="grid justify-center gap-4 bg-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {itemData.map((item: Item) => (
        <div
          key={item.id}
          id={`product-card-${item.id}`}
          className="w-50 flex flex-col items-center justify-center p-4"
        >
          <Image
            src={item.image}
            alt={item.alt}
            width={192}
            height={192}
            className="h-auto w-auto"
          />
          <div className="product-details">
            <h2>{item.brand}</h2>
            <p>{item.product}</p>
            <p>${item.price} CAD</p>
          </div>
          <button
            onClick={() => addToCart(item)}
            className="btn btn-primary btn-wide"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
