import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import Header from "@/components/commom/header";
import NavigationBar from "@/components/commom/navigation-bar";
import { db } from "@/db";
import ReactQueryProvider from "@/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bewear",
  description: "Bewear Ecommerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const category = await db.query.categoryTable.findMany({});
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Header
            categories={category.map((category) => ({
              id: category.id,
              name: category.name,
              slug: category.slug,
              created: category.created,
            }))}
          />
          <NavigationBar
            categories={category.map((category) => ({
              id: category.id,
              name: category.name,
              slug: category.slug,
              created: category.created,
            }))}
          />
          {children}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
