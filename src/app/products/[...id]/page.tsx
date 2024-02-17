import { playfairDisplay } from "@/app/fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductLayout from "@/components/product-layout";
import RelatedProductsCarousel from "@/components/related-products-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAllProductIds,
  fetchProductById,
  fetchRelatedProducts,
} from "@/lib/data";
import { wait } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const ids = await fetchAllProductIds().then((res) =>
    res?.map((product) => ({ id: [product.name, `${product._id}`] })),
  );
  return ids as any[];
}

type Props = {
  params: { id: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata | null> {
  const id = params.id[1];
  const product = await fetchProductById(id);
  const previousImages = (await parent).openGraph?.images || [];

  const nameInKeywords =
    product !== null
      ? product.name.split("/").map((keyword) => keyword.trim())
      : [];

  return {
    title: `${product?.name.split("/").at(0) || product?.name || "Not Found"} | Modern Engineers (India)`,
    description: `${product?.name
      .split("/")
      .map((word) => word.trim())
      .join(
        ", ",
      )}, Categories - ${product?.tags.join(", ")}, ${product?.keywords.join(", ")} - Modern Engineers (India)`,
    category: `${product?.tags.join(", ")}, ${product?.keywords.join(", ")}`,
    keywords: [
      ...nameInKeywords,
      ...(product?.material || []),
      ...(product?.sizes || []),
      ...(product?.keywords || []),
      ...(product?.tags || []),
      "Modern Engineers (India)",
      "Agricultural Implement Parts",
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

async function RelatedProducts({
  id,
  categories,
}: {
  id: string;
  categories: string[];
}) {
  const data = await fetchRelatedProducts(id, categories);
  if (!data) {
    notFound();
  }
  const relatedProducts = data.map((product) => ({
    ...product,
    _id: `${product._id}`,
  }));
  return <RelatedProductsCarousel relatedProducts={relatedProducts} />;
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="grid h-[300px] overflow-hidden sm:grid-cols-4 gap-4 md:grid-cols-3 xl:grid-cols-5">
      <Skeleton className="aspect-square sm:hidden" />
      <Skeleton className="hidden sm:block md:hidden col-span-1" />
      <Skeleton className="hidden sm:block md:hidden col-span-2" />
      <Skeleton className="hidden sm:block md:hidden col-span-1" />
      {Array.from({ length: 3 }).map((_, idx) => (
        <Skeleton
          key={`md-${idx}`}
          className="hidden md:block xl:hidden aspect-square"
        />
      ))}
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={`xl-${idx}`} className="hidden xl:block aspect-square" />
      ))}
    </div>
  );
}

export default async function ProductIdPage({
  params: { id },
}: {
  params: { id: string[] };
}) {
  if (id.length !== 2) {
    notFound();
  }
  const [name, _id] = id;
  const data = await fetchProductById(_id);
  if (!data) {
    notFound();
  }
  return (
    <section className="py-10 lg:py-12">
      <MaxWidthWrapper>
        <ProductLayout {...data} />
        <article className="px-6 py-4">
          <h2
            className={`${playfairDisplay.className} py-4 lg:py-8 xl:py-10 sm:mb-auto text-2xl font-medium md:text-3xl xl:text-4xl xl:leading-tight`}
          >
            Related Products
          </h2>
          <Suspense
            key={`${name}${_id}`}
            fallback={<RelatedProductsLoadingSkeleton />}
          >
            <RelatedProducts id={`${_id}`} categories={data.tags} />
          </Suspense>
        </article>
      </MaxWidthWrapper>
    </section>
  );
}
