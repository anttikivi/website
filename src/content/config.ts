import { defineCollection, z } from "astro:content";

const home = defineCollection({
  type: "content",
  schema: z.object({ title: z.string() }),
});

const navigation = defineCollection({
  type: "data",
  schema: z.object({
    label: z.string(),
    links: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
      }),
    ),
  }),
});

const translations = defineCollection({
  type: "data",
  schema: z.record(z.string(), z.string()),
});

export const collections = { home, navigation, translations };
