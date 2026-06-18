import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Fixed lastModified so the sitemap is deterministic across builds (no churn
// on every deploy). Bump this date when page content meaningfully changes.
const LAST_MODIFIED = "2026-06-17";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourcrashangel.com",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://yourcrashangel.com/estimate",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourcrashangel.com/playbook",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourcrashangel.com/decoder",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourcrashangel.com/checklist",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
