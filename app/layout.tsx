import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoriteContext";
import NavigationBar from "./(components)/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JustWatch - The Streaming Guide",
  description: "Generated by create next app",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          <NavigationBar />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
