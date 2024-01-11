"use client";

import useMediaQuery from "@/hooks/use-media-query";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { playfairDisplay } from "@/app/fonts";
import { createUrl } from "@/lib/utils";

function FilterForm({
  categories,
  children,
}: {
  categories: string[];
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("categories");
  const filterFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(filterFormRef.current || undefined);
    const params = new URLSearchParams(searchParams);
    params.delete("categories");
    // @ts-ignore
    for (const key of formData.keys()) {
      params.append("categories", key);
    }
    router.push(createUrl("/products", params));
  };
  return (
    <form ref={filterFormRef} onSubmit={(e) => handleSubmit(e)}>
      <ScrollArea
        type="auto"
        className="mt-3 h-[300px] px-4 text-sm lg:mt-0 lg:px-0 lg:h-auto lg:mb-4"
      >
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                name={category}
                defaultChecked={selectedCategories.includes(category)}
              />
              <Label htmlFor={category} className="py-1 text-sm">
                {category
                  .split(" ")
                  .map((val) => val[0].toUpperCase() + val.slice(1))
                  .join(" ")
                  .trim()}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button
        variant="secondary"
        type="reset"
        className="hidden lg:flex w-full mb-4"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.delete("categories");
          filterFormRef.current?.reset();
          router.push(createUrl("/products", params));
        }}
      >
        Clear Filters
      </Button>

      {children}
    </form>
  );
}

export default function FilterUI({ categories }: { categories: string[] }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="gap-2" variant="outline">
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="tracking-wide">Choose Filters</DrawerTitle>
          </DrawerHeader>
          <FilterForm categories={categories}>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="default" type="submit">
                  Apply Filters
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </FilterForm>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <>
      <FilterForm categories={categories}>
        <Button variant="default" type="submit" className="w-full">
          Apply Filters
        </Button>
      </FilterForm>
    </>
  );
}
// <div className="flex items-center gap-2 lg:hidden">
//     <Drawer> <DrawerTrigger asChild>
//         <Button className="gap-2" variant="outline">
//           <SlidersHorizontal size={20} />
//           <span>Filters</span>
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent className="px-3">
//         <SearchFormCategories
//           categories={categories}
//           initialSelectedCategories={selectedCategories}
//         >
//           <DrawerFooter>
//             <DrawerClose asChild>
//               <Button variant="default" type="submit">
//                 Apply
//               </Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </SearchFormCategories>
//       </DrawerContent>
//     </Drawer>
//     {selectedCategories.length > 0 ? <ClearFiltersButton /> : null}
//   </div>
//   <div className="hidden space-y-4 lg:block">
//     <h2 className={`text-2xl tracking-wide ${playfairDisplay.className}`}>
//       Filters
//     </h2>
//     <Separator orientation="horizontal" />
//     <SearchFormCategories
//       categories={categories}
//       initialSelectedCategories={selectedCategories}
//     >
//       <Button variant="default" type="submit">
//         Apply
//       </Button>
//     </SearchFormCategories>
//   </div>
//
