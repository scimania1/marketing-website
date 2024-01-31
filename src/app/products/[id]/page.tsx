import { playfairDisplay } from "@/app/fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductLayout from "@/components/product-layout";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  fetchAllProductIds,
  fetchProductById,
  fetchRelatedProducts,
} from "@/lib/data";
import { cn, createUrl, wait } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

export default async function ProductIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await fetchProductById(id);
  if (!data) {
    notFound();
  }
  const relatedProducts = await fetchRelatedProducts(id, data.tags);
  if (!relatedProducts) {
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
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
            <div className="grid grid-cols-10 w-max snap-x space-x-4 p-4">
              {relatedProducts.map((product) => (
                <Link
                  key={product.name}
                  href={`/products/${product._id}`}
                  passHref
                  className=""
                >
                  <figure className="">
                    <div className="overflow-hidden grid place-items-center h-full rounded-lg bg-muted">
                      <Image
                        src={product.imageURL}
                        alt={product.name}
                        className="aspect-square object-contain"
                        width={300}
                        height={300}
                      />
                    </div>
                    <figcaption className="z-10 pt-4 rounded-lg overflow-hidden overflow-ellipsis w-full left-4 bottom-4 text-lg text-muted-foreground">
                      <span className="p-2 font-semibold">
                        {product.name.split("/")[0].trim()}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>{" "}
        </article>
      </MaxWidthWrapper>
    </section>
  );
}
