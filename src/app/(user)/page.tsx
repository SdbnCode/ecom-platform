"use client";
import itemData from "../data/itemData";
import { useShoppingCart } from "../components/shoppingCart";
import "../globals.css";
import ProductCard from "../components/productCard";

export default function HomePage() {
  const { addToCart } = useShoppingCart();

  return (
    <div
      id="product-section"
      className="grid justify-center bg-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {itemData.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
