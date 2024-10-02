"use client";

import Navbar from "../components/navbar";
import Store from "./store/page";
import { SessionProvider } from "next-auth/react";
import CartPage from "./cart/page";
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
