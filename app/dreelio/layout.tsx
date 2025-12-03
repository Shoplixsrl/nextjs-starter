import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreelio - Framer Website Template for Founders",
  description: "Simple, modern, and sleek. The Dreelio template is perfect for app creators, founders, and SaaS businesses who want a clean, eye-catching website that will convert visitors into customers.",
  icons: {
    icon: [
      { url: "/dreelio/images/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/dreelio/images/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/dreelio/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dreelio - Framer Website Template for Founders",
    description: "Simple, modern, and sleek. The Dreelio template is perfect for app creators, founders, and SaaS businesses who want a clean, eye-catching website that will convert visitors into customers.",
    images: ["/dreelio/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreelio - Framer Website Template for Founders",
    description: "Simple, modern, and sleek. The Dreelio template is perfect for app creators, founders, and SaaS businesses who want a clean, eye-catching website that will convert visitors into customers.",
    images: ["/dreelio/images/og-image.png"],
  },
};

export default function DreelioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dreelio-page">
      {children}
    </div>
  );
}
