import Footer from "../../_components/footer";
import NavbarMenu from "../../_components/nav";

export const metadata = {
  title: "Athlete Arena",
  description: "Athlete Arena",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavbarMenu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
