"use client";

//IMPORTANT - REMEMBER TO REPLACE DUMMY DATA WITH YOUR OWN ONCE DATABASE IS SET UP
import itemData from "../data/itemData";
import { useShoppingCart } from "./_components/shoppingCart";
import "../globals.css";
import ProductCard from "./_components/productCard";

export default function HomePage() {
  const { addToCart } = useShoppingCart();

  return (
    <div
      id="product-section"
      className="grid justify-center bg-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {itemData && itemData.length > 0 ? (
        itemData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
