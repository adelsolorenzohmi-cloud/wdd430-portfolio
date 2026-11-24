import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adelso Tzep | WDD 430 Portfolio",
    template: "%s | WDD 430 Portfolio",
  },
  description: "A portfolio of web development projects built with Next.js, TypeScript, and PostgreSQL.",
  metadataBase: new URL("https://your-portfolio-url.vercel.app"),
  openGraph: {
    title: "Adelso Tzep | WDD 430 Portfolio",
    description: "A portfolio of web development projects built with Next.js, TypeScript, and PostgreSQL.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Suspense
          fallback={
            <header className="bg-[#1e40af] text-white py-4 shadow-md h-16" />
          }
        >
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}