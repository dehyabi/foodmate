import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodMate | Fresh, Fast & Friendly",
  description:
    "Order food from your favorite restaurants with FoodMate — fast delivery, great taste.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        {/* Global Background Image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 backdrop-blur-sm"
          style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
        />

        <Providers>
          {/* Main app content */}
          <div className="relative z-10 min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

