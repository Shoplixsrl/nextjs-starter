import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A beautiful Spotify clone built with Next.js",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231DB954'><circle cx='12' cy='12' r='12'/><path fill='%23000' d='M17.9 10.9c-2.4-1.4-6.4-1.6-8.6-0.9-0.4 0.1-0.8-0.1-0.9-0.5s0.1-0.8 0.5-0.9c2.6-0.8 6.9-0.6 9.6 1 0.4 0.2 0.5 0.7 0.3 1-.2.4-.6.5-0.9.3zm-0.2 2.6c-0.2 0.3-0.5 0.4-0.8 0.2-2-1.2-5-1.6-7.3-0.9-0.3 0.1-0.6-0.1-0.7-0.4s0.1-0.6 0.4-0.7c2.6-0.8 5.9-0.4 8.2 1 0.3.2.4.5.2.8zm-0.9 2.5c-0.2 0.2-0.4 0.3-0.6 0.2-1.7-1.1-3.9-1.3-6.5-0.7-0.2 0.1-0.5-0.1-0.5-0.3 0-0.2 0.1-0.5 0.3-0.5 2.8-0.6 5.2-0.4 7.1 0.8 0.2.1.3.3.2.5z'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-black text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
