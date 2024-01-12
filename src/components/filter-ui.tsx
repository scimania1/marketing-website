"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { useRouter, useSearchParams } from "next/navigation";
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
import { FormEvent, useEffect, useRef, useTransition } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn, createUrl } from "@/lib/utils";

export function ClearAllFiltersButton({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    const productGrid = document.getElementById("product-grid");
    if (isPending) {
      if (productGrid) {
        productGrid.style.opacity = "0.4";
      }
    } else {
      if (productGrid) {
        productGrid.style.opacity = "1";
      }
    }
  }, [isPending]);
  const handleClearClick = () => {
    startTransition(() => {
      const filterForm = document.getElementById(
        "filter-form",
      ) as HTMLFormElement | null;
      const params = new URLSearchParams(searchParams);
      params.delete("categories");
      params.set("page", "1");
      filterForm?.reset();
      router.push(createUrl("/products", params));
    });
  };
  return (
    <Button
      variant="secondary"
      type="reset"
      onClick={handleClearClick}
      className={cn(className)}
      onKeyDown={(e) =>
        (e.key === " " || e.key === "Enter") && handleClearClick
      }
    >
      Clear All Filters
    </Button>
  );
}

function FilterForm({
  categories,
  // isDesktop,
  children,
  handleSubmit,
}: {
  categories: string[];
  // isDesktop: boolean;
  children: React.ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("categories");
  const filterFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // useEffect(() => {
  //   const productGrid = document.getElementById("product-grid");
  //   if (isDesktop) {
  //     if (isPending) {
  //       if (productGrid) {
  //         productGrid.style.opacity = "0.4";
  //       }
  //     } else {
  //       if (productGrid) {
  //         productGrid.style.opacity = "1";
  //       }
  //     }
  //   }
  // }, [isPending, isDesktop]);
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   startTransition(() => {
  //     const formData = new FormData(filterFormRef.current || undefined);
  //     const params = new URLSearchParams(searchParams);
  //     params.delete("categories");
  //     // @ts-ignore
  //     for (const key of formData.keys()) {
  //       params.append("categories", key);
  //     }
  //     router.push(createUrl("/products", params));
  //   });
  // };
  const handleClearClick = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete("categories");
      params.set("page", "1");
      filterFormRef.current?.reset();
      router.push(createUrl("/products", params));
    });
  };
  return (
    <form
      ref={filterFormRef}
      onSubmit={(e) => handleSubmit(e)}
      id="filter-form"
    >
      <ScrollArea
        type="auto"
        className="mt-3 h-[300px] px-4 text-sm lg:mt-0 lg:px-0 lg:h-auto lg:mb-4"
      >
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2 lg:px-2">
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
        onClick={handleClearClick}
        onKeyDown={(e) =>
          (e.key === " " || e.key === "Enter") && handleClearClick
        }
      >
        Clear Filters
      </Button>
      {children}
    </form>
  );
}

export function FilterSection({
  categories,
  handleSubmit,
}: {
  categories: string[];
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
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
          <FilterForm categories={categories} handleSubmit={handleSubmit}>
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
      <FilterForm categories={categories} handleSubmit={handleSubmit}>
        <Button variant="default" type="submit" className="w-full">
          Apply Filters
        </Button>
      </FilterForm>
    </>
  );
}

export default function FilterUI({ categories }: { categories: string[] }) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const productGrid = document.getElementById("product-grid");
    if (isPending) {
      if (productGrid) {
        productGrid.style.opacity = "0.4";
      }
    } else {
      if (productGrid) {
        productGrid.style.opacity = "1";
      }
    }
  }, [isPending]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const form = document.getElementById(
        "filter-form",
      ) as HTMLFormElement | null;
      const formData = new FormData(form || undefined);
      const params = new URLSearchParams(searchParams);
      params.delete("categories");
      params.set("page", "1");
      // @ts-ignore
      for (const key of formData.keys()) {
        params.append("categories", key);
      }
      router.push(createUrl("/products", params));
    });
  };
  return <FilterSection categories={categories} handleSubmit={handleSubmit} />;
}

// REDO USING SERVER ACTIONS, WHATEVER THIS IS, IS JUST ABSOLUTE TRASH
