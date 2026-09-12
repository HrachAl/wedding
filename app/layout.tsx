import type { Metadata, Viewport } from "next";
import { Noto_Serif_Armenian, Noto_Sans_Armenian } from "next/font/google";

import { ThemeScript } from "@/components/theme-script";
import { WEDDING } from "@/lib/constants";
import "./globals.css";

const serif = Noto_Serif_Armenian({
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${WEDDING.groom} 🤍 ${WEDDING.bride} — Հարսանյաց հրավեր`,
  description: WEDDING.invitation,
  openGraph: {
    title: `${WEDDING.groom} 🤍 ${WEDDING.bride}`,
    description: WEDDING.invitation,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hy"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
