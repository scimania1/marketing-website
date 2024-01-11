import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

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
