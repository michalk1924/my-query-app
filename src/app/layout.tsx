"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/header/Header';

import "./globals.css";
import Link from "next/link";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
