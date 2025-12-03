import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agen - AI SaaS Template",
  description: "Build AI agents that work for you. Create intelligent automation solutions with our modern SaaS template.",
  keywords: ["AI", "SaaS", "automation", "customer support", "chatbot", "AI agents"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#f9f7f7]">
        {children}
      </body>
    </html>
  );
}
