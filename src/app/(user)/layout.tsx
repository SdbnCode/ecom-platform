import Navbar from "./_components/nav";
import "../globals.css";
import Footer from "./_components/footer";

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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
