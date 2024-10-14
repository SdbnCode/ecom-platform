import Navbar from "@/app/components/navbar";
import { ShoppingCartProvider } from "../components/shoppingCart";
import "../globals.css";
import Footer from "@/app/components/footer";

export const metadata = {
  title: "Athlete's Arena",
  description: "Athlete's Arena where you find your inner athelete.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ShoppingCartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
