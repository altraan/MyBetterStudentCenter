import type { Metadata } from "next";
import "./globals.css";
import PhoneMockup from "@/components/PhoneMockup";

export const metadata: Metadata = {
  title: "myStudentCenter",
  description: "Better Student Information System",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PhoneMockup>{children}</PhoneMockup>
      </body>
    </html>
  );
}
