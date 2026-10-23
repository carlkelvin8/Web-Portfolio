import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://web-portfolio-tau-rust.vercel.app"),
  title: "Carl Kelvin Manahan | Freelance MVP Developer, Philippines",
  description:
    "Freelance software engineer in the Philippines. I build MVPs for startup founders: web apps, mobile apps, and admin dashboards, shipped fast. Book a free call.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Carl Kelvin Manahan",
    title: "Carl Kelvin Manahan | Freelance MVP Developer",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
