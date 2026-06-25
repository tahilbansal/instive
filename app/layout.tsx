import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instive AI — Mockups",
  description:
    "Personalized AI mockups built for real logistics and supply chain companies. See exactly what your operation looks like with an AI layer on top.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ink font-sans text-[#e7e7ee] antialiased">
        {children}
      </body>
    </html>
  );
}
