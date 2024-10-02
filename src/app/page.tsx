"use client";

import Navbar from "./components/navbar";
import Store from "./store/page";
import {
  ShoppingCartProvider,
  useShoppingCart,
} from "./components/shoppingCart";
import { SessionProvider } from "next-auth/react";
import CartPage from "./cartPage/page";
import "./globals.css";

function App() {
  return (
    <div>
      <Navbar />
      <Store />
    </div>
  );
}

export default App;
