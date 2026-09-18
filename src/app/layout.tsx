import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "../styles.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ceasiun — Digital Growth Partner",
  description: "Ceasiun builds digital products and growth systems for ambitious businesses.",
  authors: [{ name: "Ceasiun" }],
  openGraph: { title: "Ceasiun — Digital Growth Partner", description: "Digital solutions and support for business growth.", type: "website" },
  twitter: { card: "summary_large_image", site: "@ceasiun" },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#08090b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}

export const dynamic = "force-dynamic";
