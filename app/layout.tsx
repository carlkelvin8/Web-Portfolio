import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://carlkelvinmanahan.com"),
  title: "Carl Kelvin Manahan | Freelance MVP & App Developer, Philippines",
  description:
    "Freelance web & app developer in the Philippines. Web apps, mobile apps, admin dashboards, and MVPs for startups and businesses. Projects from $1,900.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Carl Kelvin Manahan",
    title: "Carl Kelvin Manahan | Freelance MVP & App Developer, Philippines",
    images: [{ url: "/og-image-suit.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
