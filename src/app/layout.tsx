import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalLoadingProvider } from "@/providers/GlobalLoadingProvider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";

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
    default: "LamBH",
    template: "%s | Lambh.io.vn",
  },
  description: "I build minimal, scalable interfaces and robust backends. Fullstack Engineer based in Ho Chi Minh City.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lambh.io.vn/",
    title: "LamBH",
    description: "I build minimal, scalable interfaces and robust backends. Fullstack Engineer based in Ho Chi Minh City.",
    siteName: "LamBH",
  },
  twitter: {
    card: "summary_large_image",
    title: "LamBH",
    description: "I build minimal, scalable interfaces and robust backends. Fullstack Engineer based in Ho Chi Minh City.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-pt-16 snap-y snap-proximity scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground dark:bg-black dark:text-white`}
      >
        <NextTopLoader showSpinner={false} />
        <GlobalLoadingProvider>
          {children}
        </GlobalLoadingProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
