import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import StoreProvider from "@/lib/store-provider";
import { LoadingProvider } from "@/lib/loading-provider";
import { Inter } from "next/font/google";
import initializeApp from "@/lib/init-app";
import { AuthProvider } from "@/lib/auth-provider";
import { Toast } from "@/components/toast/Toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HR Management System",
  description: "HR Management System",
};

const inter = Inter({ subsets: ["latin"] });
initializeApp();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        {/* <React.StrictMode> */}
              <LoadingProvider>
                <AuthProvider>
                  <StoreProvider>
                    {children}
                    <Toast />
                  </StoreProvider>
                </AuthProvider>
              </LoadingProvider>
        {/* </React.StrictMode> */}
      </body>
    </html>
  );
}
