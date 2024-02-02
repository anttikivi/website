import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const tailwindConfig =
  process.env.HUGO_FILE_TAILWIND_CONFIG_JS || "./tailwind.config.js";

const config = {
  plugins: [
    tailwindcss(tailwindConfig),
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [autoprefixer] : []),
  ],
};

export default config;
