import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://anandkumar.dev", lastModified: new Date() }];
}
