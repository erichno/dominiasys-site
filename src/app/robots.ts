import type { MetadataRoute } from "next";
import empresa from "@/content/empresa";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${empresa.dominio}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/p/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
