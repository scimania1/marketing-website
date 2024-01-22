import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductLayout from "@/components/product-layout";
import { fetchAllProductIds, fetchProductById } from "@/lib/data";
import { wait } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const ids = await fetchAllProductIds().then((ids) =>
    ids?.map((id) => ({ id: `${id._id}` })),
  );
  return ids as any[];
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata | null> {
  const id = params.id;
  const product = await fetchProductById(id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product?.name.split("/").at(0) || product?.name} | Modern Engineers (India)`,
    description: product?.name,
    keywords: [
      product?.name || "",
      ...(product?.material || []),
      ...(product?.sizes || []),
      ...(product?.keywords || []),
      ...(product?.tags || []),
    ],
    openGraph: {
      type: "website",
      images: [`${product?.imageURL}`, ...previousImages],
      title: `${product?.name.split("/").at(0) || product?.name} | Modern Engineers (India)`,
      description: product?.name,
    },
    twitter: {
      card: "summary",
      images: [`${product?.imageURL}`, ...previousImages],
      title: `${product?.name.split("/").at(0) || product?.name} | Modern Engineers (India)`,
      description: product?.name,
    },
  };
}

export default async function ProductIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await fetchProductById(id);
  // await wait(300000);
  if (!data) {
    notFound();
  }
  return (
    <section className="py-4 lg:py-6">
      <MaxWidthWrapper>
        <ProductLayout {...data} />
      </MaxWidthWrapper>
    </section>
  );
}
