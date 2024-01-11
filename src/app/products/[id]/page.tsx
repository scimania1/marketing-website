import { fetchProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function ProductData({ productId }: { productId: string }) {
  const data = await fetchProductById(productId);
  if (!data) {
    notFound();
  }
  return (
    <article>
      <h2>{data.name}</h2>
      <h2>{`${data._id}`}</h2>
    </article>
  );
}

export default function ProductIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section>
      <h2>Product ID: {id}</h2>
      <Suspense fallback={<h1>Loading Product Data ...</h1>} key={id}>
        <ProductData productId={id} />
      </Suspense>
    </section>
  );
}
