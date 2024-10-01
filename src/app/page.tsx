"use client";

import Navbar from "./components/navbar";
import Store from "./pages/store";
import Cart from "./components/cart";
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
