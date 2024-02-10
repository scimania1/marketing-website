import { baseURL } from "@/lib/constants";
import { fetchAllProductIds } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products = await fetchAllProductIds();
  let sitemapProductsArray: MetadataRoute.Sitemap;
  let baseSitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseURL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
  if (!products) {
    return baseSitemap;
  } else {
    sitemapProductsArray = products.map((product) => ({
      url: `${baseURL}/products/${product.name.split("/")[0].trim().replaceAll(" ", "-").replaceAll("&", "and")}/${product._id}`,
      lastModified: new Date(),
    }));
    return [...baseSitemap, ...sitemapProductsArray];
  }
}
