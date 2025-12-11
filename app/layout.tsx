import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventHub - Discover Amazing Events Near You",
  description: "Find and book tickets to concerts, conferences, workshops, and more. Join thousands of people discovering unforgettable experiences.",
  keywords: ["events", "tickets", "concerts", "conferences", "meetups", "workshops", "festivals"],
  authors: [{ name: "EventHub" }],
  creator: "EventHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eventhub.com",
    siteName: "EventHub",
    title: "EventHub - Discover Amazing Events Near You",
    description: "Find and book tickets to concerts, conferences, workshops, and more.",
    images: [
      {
        url: "/images/ui/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EventHub - Discover Amazing Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EventHub - Discover Amazing Events",
    description: "Find and book tickets to concerts, conferences, workshops, and more.",
    images: ["/images/ui/twitter-card.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
