import { playfairDisplay } from "@/app/fonts";
import { Product } from "@/lib/products-model";
import Image from "next/image";

export default function ProductLayout(product: Product) {
  return (
    <article className="px-8 grid gap-4 sm:grid-cols-2">
      <figure className="relative aspect-square rounded-xl">
        <Image
          className="rounded-xl"
          src={product.imageURL}
          alt={product.name}
          fill
        />
      </figure>
      <div className="space-y-2 lg:space-y-4">
        <h1
          className={`${playfairDisplay.className} text-2xl font-medium text-balance tracking-wide md:text-3xl`}
        >
          {product.name}
        </h1>
      </div>
    </article>
  );
}
