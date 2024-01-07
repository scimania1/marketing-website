import type { Metadata } from "next";
import "./globals.css";
import { nunitoSans } from "./fonts";

export const metadata: Metadata = {
  title: "Modern Engineers (India)",
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
          <header>Header</header>
          <main className="flex-1 flex-grow">{children}</main>
          {/* Footer here */}
          <footer>Footer</footer>
        </div>
      </body>
    </html>
  );
}
