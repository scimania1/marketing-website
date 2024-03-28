import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { baseURL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function createUrl(
  pathname: string,
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = searchParams.toString();
  const queryString = `${paramsString.length > 0 ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
}

export function range(start: number, end: number, step = 1) {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, num) => start + step * num,
  );
}

export function createCategoryLink(categories: string[]) {
  const mask = (1 << categories.length) - 1;
  let results: string[] = [];
  for (let i = 1; i <= mask; ++i) {
    let j = i;
    let iter_count = 0;
    let temp: string[] = [];
    while (j > 0) {
      if (j & 1) {
        temp.push(categories[iter_count]);
      }
      iter_count++;
      j = j >> 1;
    }
    const params = new URLSearchParams(
      temp.map((category) => ["categories", category]),
    );
    results.push(createUrl(`${baseURL}/products`, params));
  }
  return results;
}
