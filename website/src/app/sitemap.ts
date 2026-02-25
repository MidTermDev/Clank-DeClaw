import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://declaws.com";
  
  // Static pages
  const staticPages = [
    "",
    "/browse",
    "/favorites",
    "/compare",
    "/rarity",
    "/agent",
    "/hackathon",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic NFT pages
  const nftPages = Array.from({ length: 1000 }, (_, i) => ({
    url: `${baseUrl}/declaw/${i}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...nftPages];
}
