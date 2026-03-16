import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Infinity Tech — Intelligent Systems for Modern Manufacturing",
  description:
    "We help manufacturing companies improve efficiency, reduce costs, and leverage automation and AI to achieve their business goals.",
  openGraph: {
    title: "Infinity Tech — Intelligent Systems for Modern Manufacturing",
    description:
      "We help manufacturing companies improve efficiency, reduce costs, and leverage automation and AI to achieve their business goals.",
    type: "website",
    url: "https://infinitytechllc.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-dark text-text-body font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
