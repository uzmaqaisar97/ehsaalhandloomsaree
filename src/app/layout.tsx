import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/navigation";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.slogan} ${siteConfig.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
