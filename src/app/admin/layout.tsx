import "../globals.css";

export const metadata = {
  title: "Athlete's Arena",
  description: "Athlete's Arena where you find your inner athelete.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
