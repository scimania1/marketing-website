import { playfairDisplay } from "@/app/fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductLayout from "@/components/product-layout";
import RelatedProductsCarousel from "@/components/related-products-carousel";
import {
  fetchAllProductIds,
  fetchProductById,
  fetchRelatedProducts,
} from "@/lib/data";
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

  return {
    title: `${product?.name.split("/").at(0) || product?.name} | Modern Engineers (India)`,
    description: "Modern Engineers (India) " + product?.name,
    keywords: [
      product?.name || "",
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
  return (
    <article className="px-6 py-4">
      <h2
        className={`${playfairDisplay.className} py-4 lg:py-8 xl:py-10 sm:mb-auto text-2xl font-medium md:text-3xl xl:text-4xl xl:leading-tight`}
      >
        Related Products
      </h2>
      <RelatedProductsCarousel relatedProducts={relatedProducts} />
    </article>
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
        <Suspense
          key={`${name}${_id}`}
          fallback={<h1>Loading Recommendations</h1>}
        >
          <RelatedProducts id={`${_id}`} categories={data.tags} />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
}
