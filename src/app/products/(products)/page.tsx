import ProductCard from "@/components/product-card";
import ProductPagination from "@/components/product-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/lib/constants";
import {
  fetchAllProducts,
  fetchAllProductsCount,
  fetchFilteredProducts,
  fetchFilteredProductsCount,
} from "@/lib/data";
import { range } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

async function ProductsGrid({
  page,
  query,
  categories,
}: {
  page: number;
  query: string;
  categories: string[];
}) {
  if (!query.length) {
    const products = await fetchAllProducts(page, categories);
    if (!products) {
      return <h2>No Search Results found</h2>;
    }
    return (
      <>
        {products.map((product) => (
          <ProductCard key={`${product._id + product.imageURL}`} {...product} />
        ))}
      </>
    );
  } else {
    const products = await fetchFilteredProducts(page, query, categories);
    if (!products) {
      return <h2>No Search Results found</h2>;
    }
    return (
      <>
        {products.map((product) => (
          <ProductCard key={`${product._id + product.imageURL}`} {...product} />
        ))}
      </>
    );
  }
}

function CardLoadingSkeleton({ limit }: { limit: number }) {
  const arr = range(1, limit);
  return (
    <>
      {arr.map((_, idx) => (
        <Skeleton key={idx} className="h-[400px]" />
      ))}
    </>
  );
}

async function PageNumbers({
  page,
  query,
  categories,
}: {
  page: number;
  query: string;
  categories: string[];
}) {
  let count: number | null;
  if (!query.length) {
    count = await fetchAllProductsCount(page, categories);
  } else {
    count = await fetchFilteredProductsCount(page, query, categories);
  }
  if (!count) {
    return null;
  }
  return (
    <ProductPagination
      totalPages={Math.ceil(count / DEFAULT_LIMIT)}
      currentPage={page}
    />
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page || "") || DEFAULT_PAGE
      : DEFAULT_PAGE;

  const query =
    typeof searchParams.query === "string" ? searchParams.query : "";

  let categories: string[];
  if (typeof searchParams.categories === "string") {
    categories =
      searchParams.categories.trim().length > 0
        ? [searchParams.categories]
        : [];
  } else if (Array.isArray(searchParams.categories)) {
    categories = searchParams.categories.map((category) => category.trim());
  } else {
    categories = [];
  }

  return (
    <div>
      <article
        id="product-grid"
        className="grid auto-rows-max grid-cols-1 mb-4 gap-4 py-4 sm:grid-cols-2 md:gap-6 md:py-8 lg:gap-8 xl:grid-cols-3"
      >
        <Suspense
          key={`${page}${categories}${query}`}
          fallback={<CardLoadingSkeleton limit={DEFAULT_LIMIT} />}
        >
          <ProductsGrid page={page} query={query} categories={categories} />
        </Suspense>
      </article>
      <Suspense
        key={`${page}${categories}${query}-page-number`}
        fallback={<h1>Loading Page Numbers...</h1>}
      >
        <PageNumbers page={page} query={query} categories={categories} />
      </Suspense>
    </div>
  );
}
