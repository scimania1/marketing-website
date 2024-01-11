import { playfairDisplay } from "@/app/fonts";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { SearchBar } from "@/components/search-bar";
import { fetchTags } from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";
import bgGrid from "@/assets/bg-grid.png";

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
    <div>
      {tags.map((tag, idx) => {
        let tagName = tag
          .split(" ")
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join(" ");
        return <h3 key={tag}>{`${idx + 1}. ${tagName}`}</h3>;
      })}
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
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.07' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/g%3E%3C/svg%3E");`,
        }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl">
          <span>Gear up for success with our</span>
          <span className="sm:mt-3 sm:block">
            {" "}
            high-performance mechanical components
          </span>
        </h1>
      </section>
      <MaxWidthWrapper>
        <div className="relative grid items-start gap-4 py-4 sm:px-8 lg:grid-cols-[1fr_3fr] lg:gap-8 lg:py-8 xl:grid-cols-[1fr_4fr]">
          <aside>
            <Suspense key="filter-tags" fallback={<h1>Loading Filters...</h1>}>
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
