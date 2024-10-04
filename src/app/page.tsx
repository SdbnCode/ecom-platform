"use client";

import Store from "./store/page";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

function App() {
  return (
    <div>
      <Store />
    </div>
  );
}

export default App;
