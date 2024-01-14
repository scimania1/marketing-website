"use server";

import { createUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function applyFilters(query: string, formData: FormData) {
  const params = new URLSearchParams(`?query=${query}`);
  params.set("page", "1");
  formData.forEach((val, key) => {
    if (val == "on") {
      params.append("categories", key);
    }
  });
  const url = createUrl("/products", params);
  redirect(url);
}
