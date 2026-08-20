import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Fixed lastModified so the sitemap is deterministic across builds (no churn
// on every deploy). Bump this date when page content meaningfully changes.
const LAST_MODIFIED = "2026-06-17";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourcrashangel.com",
      lastModified: "2026-07-08",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://yourcrashangel.com/privacy",
      lastModified: "2026-07-08",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://yourcrashangel.com/estimate",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourcrashangel.com/totaled",
      lastModified: "2026-07-07",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourcrashangel.com/start",
      lastModified: "2026-08-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://yourcrashangel.com/lowball",
      lastModified: "2026-08-19",
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
