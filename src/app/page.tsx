"use client";

import Navbar from "../components/navbar";
import Store from "./store/page";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

function App() {
  return (
    <div>
      <Navbar />
      <Store />
    </div>
  );
}

export default App;
