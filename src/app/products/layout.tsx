import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col flex-1 flex-grow">{children}</div>;
}
