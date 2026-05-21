import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { BlobCursor } from "@/components/ui/BlobCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Cal Sans — local display font
const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Stackform: I build systems that grow your business.",
  description:
    "Stackform combines conversion-focused web development with automation expertise. Not just a website, but a complete system that captures leads, nurtures them, and integrates with your existing tools.",
  metadataBase: new URL("https://stack-form.dev"),
  openGraph: {
    title: "Stackform: I build systems that grow your business.",
    description:
      "Conversion-focused web development with automation expertise. D2C brands, SaaS startups, local service businesses.",
    url: "https://stack-form.dev",
    siteName: "Stackform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stackform Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackform: I build systems that grow your business.",
    description:
      "Conversion-focused web development with automation expertise.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/CalSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${calSans.variable} antialiased`}
      >
        <LenisProvider>
          <BlobCursor />
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
