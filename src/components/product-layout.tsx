import { playfairDisplay } from "@/app/fonts";
import { Product } from "@/lib/products-model";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import ProductDescriptionCollapsible from "./product-description-collapsible";

function ProductDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="odd:bg-muted px-3 grid grid-cols-2 py-2">{children}</div>
  );
}

export default function ProductLayout(product: Product) {
  const details = {
    sizes: product.sizes,
    material: product.material,
    finishing: product.finishing,
    minQty: product.minQty,
    hardening: product.hardening,
  };
  return (
    <article className="px-6 grid gap-4 lg:grid-cols-2 lg:gap-8">
      <figure className="relative bg-muted lg:h-full rounded-xl aspect-square lg:aspect-auto">
        <Image
          className="rounded-xl object-contain"
          src={product.imageURL}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw"
        />
      </figure>
      <div className="space-y-3 lg:space-y-4">
        <h1
          className={`${playfairDisplay.className} sm:mb-auto text-3xl font-medium md:text-4xl xl:text-5xl xl:leading-tight`}
        >
          {product.name.split("/").at(0)}
        </h1>
        <h2 className="text-muted-foreground md:text-xl xl:text-2xl text-lg">
          {product.name}
        </h2>
        <Separator />
        <ProductDescriptionCollapsible
          details={product.sizes}
          detailName="Size"
        />
        <ProductDescriptionCollapsible
          details={product.material}
          detailName="Material"
        />
        <ProductDescriptionCollapsible
          details={product.finishing}
          detailName="finishing"
        />
        <div className="grid gap-2 lg:gap-4 py-3">
          <h3 className="uppercase text-lg font-bold lg:text-xl">
            Min Quantity
          </h3>
          <Badge
            variant="secondary"
            className="text-md justify-self-start text-muted-foreground py-1 px-3 lg:px-5 lg:text-lg"
          >
            {product.minQty + " Pcs."}
          </Badge>
        </div>
        <div className="grid gap-2 lg:gap-4 py-3">
          <h3 className="uppercase text-lg font-bold lg:text-xl">Hardening</h3>
          <Badge
            variant="secondary"
            className="text-md justify-self-start text-muted-foreground py-1 px-3 lg:px-5 lg:text-lg"
          >
            {product.hardening[0].toUpperCase() + product.hardening.slice(1)}
          </Badge>
        </div>
      </div>
    </article>
  );
}
