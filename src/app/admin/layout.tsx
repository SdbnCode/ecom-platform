import React from "react";
import "../globals.css";
import AdminNav from "../components/adminNav";

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
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AdminNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
