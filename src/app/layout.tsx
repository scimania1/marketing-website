import type { Metadata } from "next";
import "./globals.css";
import { nunitoSans } from "./fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { baseURL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: "Modern Engineers (India)",
    template: "%s | Modern Engineers (India)",
  },
  keywords: ["Modern Engineers (India)", "Agricultural Implement Parts"],
  metadataBase: new URL(baseURL),
  description: "The standard for Agricultural Implement Parts and Equipment",
  openGraph: {
    title: "Modern Engineers (India)",
    description: "The standard for Agricultural Implement Parts and Equipment",
    images: [`${baseURL}/Logo.png`],
    url: baseURL,
    siteName: "Modern Engineers (India)",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Modern Engineers (India)",
    description: "The standard for Agricultural Implement Parts and Equipment",
    images: [`${baseURL}/Logo.png`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.className} relative bg-background min-h-screen antialiased font-sans`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
