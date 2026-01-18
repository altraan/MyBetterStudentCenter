import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'myStudent Centre - Sheridan College',
  description: 'Your central hub for academic progress, finances, and more',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground bg-background`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
