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
    "Stackform provides conversion-focused web development and automation. We build custom systems to capture leads and scale your business.",
  metadataBase: new URL("https://stack-form.dev"),
  openGraph: {
    title: "Stackform: I build systems that grow your business.",
    description:
      "Conversion-focused web development with automation expertise. D2C brands, SaaS startups, local service businesses.",
    url: "https://stack-form.dev",
    siteName: "Stackform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackform: I build systems that grow your business.",
    description:
      "Conversion-focused web development with automation expertise.",
    site: "@StackForm_dev",
    creator: "@StackForm_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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
