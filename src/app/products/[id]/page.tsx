import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductLayout from "@/components/product-layout";
import { fetchAllProductIds, fetchProductById } from "@/lib/data";
import { wait } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const ids = await fetchAllProductIds().then(
    (ids) => ids?.map((id) => ({ id: `${id._id}` })),
  );
  return ids as any[];
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
