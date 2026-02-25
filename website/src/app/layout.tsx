import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import GlobalShortcuts from "@/components/GlobalShortcuts";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiCode from "@/components/KonamiCode";
import Inventory from "@/components/Inventory";
import BackToTop from "@/components/BackToTop";
import ShortcutsHelp from "@/components/ShortcutsHelp";
import ScrollToTopOnNav from "@/components/ScrollToTopOnNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeClaw — 1,000 Claw-Machine Robot PFPs on Solana",
  description:
    "DeClaw is an open-source collection of 1,000 generative claw-machine robot PFPs with MPL-404 hybrid bridge on Solana. Swap between CLAW tokens and NFTs.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <ScrollProgress />
          <GlobalShortcuts />
          <KonamiCode />
          <Inventory />
          <BackToTop />
          <ShortcutsHelp />
          <ScrollToTopOnNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
