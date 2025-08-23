import type { Metadata } from "next";
import {
  Geist_Mono,
  Playfair_Display,
  Inter,
  Allura
} from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Carlota Vaquer Rodemann - Portfolio",
  description: "Design Student & Creative Artist Portfolio",
  icons: {
    icon: 'star.svg',
    shortcut: 'star.svg',
    apple: 'star.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} ${allura.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
