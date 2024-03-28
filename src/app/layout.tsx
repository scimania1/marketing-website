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
  keywords: [
    "Modern Engineers (India)",
    "Agricultural Implement Parts",
    "Gourav DLX Bolts",
    "Gourav DLX Tractor Parts",
    "Gourav DLX John Deere Tractor Weight Bolts ",
    "MEI Agricultural Implement Parts",
    "MEI Tractor Trolley parts",
  ],
  metadataBase: new URL(baseURL),
  description:
    "Modern Engineers (India), based in Jalandhar, Punjab, stands as the benchmark for Agricultural Implement Parts and Equipment.",
  category: "Agricultural Implement Parts and Equipment, Fasteners",
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organisationJsonLd = {
    "@context": "http://schema.org",
    "@type": "Organization",
    legalName: "Modern Engineers (India)",
    url: `${baseURL}`,
    logo: `${baseURL}/Logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "91-8280390000",
      email: "modernengineersindia@gmail.com",
      url: `${baseURL}/contact-us`,
    },
    founder: {
      "@type": "Person",
      givenName: "Parduman",
      familyName: "Singh",
      url: `${baseURL}/about-us`,
      image: `${baseURL}/OwnerImage2.png`,
    },
  };
  return (
    <html lang="en" suppressHydrationWarning className="relative">
      <body
        className={`${nunitoSans.className} relative bg-background min-h-screen antialiased font-sans`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col flex-1 flex-grow">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
