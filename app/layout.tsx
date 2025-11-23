import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "VibeCode Market - Digital Marketplace for Developers",
  description: "Buy and sell digital products, code templates, and creative assets. Instant purchase, auctions, and subscriptions available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
