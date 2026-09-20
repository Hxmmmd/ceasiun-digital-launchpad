import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "../styles.css";
import { RouteProgress } from "@/components/route-progress";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  verification: {
    google: "3Be8a7HHWWiGPIsTK8ZHSaGTTzbxnIgEt5KkeBy-H1A",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#08090b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <RouteProgress />
        {children}
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
