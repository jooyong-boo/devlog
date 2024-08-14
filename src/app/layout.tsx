import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEVLOG - jooyong",
  description: "jooyong's devlog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen dark:bg-slate-900 ${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
