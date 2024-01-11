import type { Metadata } from "next";
import "./globals.css";
import { nunitoSans } from "./fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Modern Engineers (India)",
    template: "%s | Modern Engineers (India)",
  },
  description: "The standard for Agricultural Implement Parts and Equipment",
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
          {/* Navbar here */}
          <Header />
          <main className="flex-1 flex-grow">{children}</main>
          {/* Footer here */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
