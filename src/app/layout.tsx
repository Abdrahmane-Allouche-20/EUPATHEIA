import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header/page";
import NextAuthProvider from "./provider/NextAuthProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EUPATHEIA",
  description: "EUPATHEIA is a quote website dedicated to healing, hope, and emotional renewal — inspired by the Greek goddess of health. Find the words that lift you when you feel low.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
       <NextAuthProvider>
        <Header/>
        {children}
        </NextAuthProvider> 
      </body>
    </html>
  );
}
