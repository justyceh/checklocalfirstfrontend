import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://checklocalfirst.com'),
  title: "Check Local First",
  description: "CheckLocalFirst is a local business directory platform built for Reno, Nevada. It connects people who want to shop local with small businesses owned by real Reno locals — people who pour genuine care and quality into what they do. It is not a review site. It is not Google or Yelp. It is a community-first platform that exists to keep money, attention, and loyalty inside the Reno community.",
  alternates: { canonical: '/' },
  icons: { icon: '/imgs/clf.png' },
  openGraph: {
    title: 'Check Local First',
    description: 'A community-first local business directory for Reno, Nevada. Discover and support real Reno locals.',
    type: 'website',
    siteName: 'Check Local First',
    images: [{ url: '/imgs/og-image.jpg', width: 1200, height: 630, alt: 'Check Local First' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Check Local First',
    description: 'A community-first local business directory for Reno, Nevada. Discover and support real Reno locals.',
    images: ['/imgs/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
          <Navbar />
          {children}
          <Footer />
        </body>
    </html>
  );
}
