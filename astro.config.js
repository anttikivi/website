import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  build: {
    format: "directory",
  },
  site:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4321"
      : "https://www.anttikivi.fi",
  trailingSlash: "always",
  integrations: [tailwind(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
        },
      ],
    ],
  },
});
