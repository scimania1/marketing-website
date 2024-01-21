import { playfairDisplay } from "@/app/fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { SearchBar } from "@/components/search-bar";
import { fetchTags } from "@/lib/data";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { range } from "@/lib/utils";
import React from "react";
import FilterUI, { ClearAllFiltersButton } from "@/components/filter-ui";

function FiltersLoader() {
  const arr = range(1, 12);
  return (
    <div className="lg:py-4 hidden lg:grid justify-center align-center grid-cols-[1fr_8fr] gap-3">
      {arr.map((_, idx) => (
        <React.Fragment key={idx}>
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
        </React.Fragment>
      ))}
    </div>
  );
}

async function FilterTags() {
  const tags = await fetchTags();
  if (!tags) {
    return <h1>Not Connected</h1>;
  } else {
    tags.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() === b.toLowerCase()) {
        return 0;
      } else {
        return 1;
      }
    });
  }
  return (
    <div className="flex gap-4 justify-center items-center lg:py-4 lg:block">
      <FilterUI categories={tags} />
      <ClearAllFiltersButton className="lg:hidden" />
    </div>
  );
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section
        className={`grid relative items-center justify-center text-center sm:px-6 py-6 h-72 lg:h-96 border-b-border [mask-image:linear-gradient(to_bottom,transparent,10%,white,90%,transparent)] ${playfairDisplay.className} `}
        // style={{
        //   backgroundColor: "#ffffff",
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.07' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/g%3E%3C/svg%3E");`,
        // }}
        // style={{
        //   backgroundColor: "#ffffff",
        //   opacity: 0.6,
        //   backgroundImage:
        //     "radial-gradient(#000000 0.6000000000000001px, transparent 0.6000000000000001px), radial-gradient(#000000 0.6000000000000001px, #ffffff 0.6000000000000001px)",
        //   backgroundSize: "24px 24px",
        //   backgroundPosition: "0 0,12px 12px",
        // }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#ffffff",
            opacity: 0.1,
            backgroundImage:
              "linear-gradient(#000000 1.2000000000000002px, transparent 1.2000000000000002px), linear-gradient(to right, #000000 1.2000000000000002px, #ffffff 1.2000000000000002px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <h1 className="text-3xl tracking-wide md:text-5xl text-balance lg:text-6xl z-30">
          <span>Gear up for success with our</span>
          <span className="sm:mt-3 sm:block">
            {" "}
            high-performance mechanical components
          </span>
        </h1>
      </section>
      <MaxWidthWrapper>
        <div className="relative grid items-start gap-4 py-4 sm:px-8 lg:grid-cols-[1fr_3fr] lg:gap-8 lg:py-8 xl:grid-cols-[1fr_4fr]">
          <aside className="lg:sticky top-4 self-start lg:space-y-3">
            <h2
              className={`hidden lg:block ${playfairDisplay.className} text-2xl tracking-wider`}
            >
              Filters
            </h2>
            <Separator className="hidden lg:block" />
            <Suspense key="filter-tags" fallback={<FiltersLoader />}>
              <FilterTags />
            </Suspense>
          </aside>
          <section>
            <div className="grid grid-cols-1 gap-4 md:items-center md:justify-center lg:grid-cols-[1fr_1fr]">
              <SearchBar placeholder="Search Products..." />
            </div>
            {children}
          </section>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
