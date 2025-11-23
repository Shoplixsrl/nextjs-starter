import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";

export const metadata: Metadata = {
  title: "FoodHub - Ordina il tuo cibo preferito",
  description: "Scopri i migliori ristoranti della tua città e ordina a domicilio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
