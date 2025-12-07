import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitPulse - Transform Your Fitness Journey",
  description: "The all-in-one fitness app with personalized workouts, nutrition tracking, and real-time coaching to help you achieve your health goals faster.",
  keywords: ["fitness", "workout", "health", "training", "exercise", "nutrition", "wellness"],
  authors: [{ name: "FitPulse" }],
  openGraph: {
    title: "FitPulse - Transform Your Fitness Journey",
    description: "The all-in-one fitness app with personalized workouts, nutrition tracking, and real-time coaching.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
