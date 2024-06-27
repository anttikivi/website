import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const tailwindConfig =
  process.env.HUGO_FILE_TAILWIND_CONFIG_JS || "./tailwind.config.js";

/** @type {import("postcss-load-config").Config} */
export default {
  plugins: [
    tailwindcss(tailwindConfig),
    ...(process.env.HUGO_ENVIRONMENT === "production" ||
    process.env.HUGO_ENVIRONMENT === "staging"
      ? [autoprefixer]
      : []),
  ],
};
