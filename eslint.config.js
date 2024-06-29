import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["public/*"],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
        // @ts-expect-error The current Node.js version uses `import.meta`.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["*.config.js"],
    ...tseslint.configs.disableTypeChecked,
  },
);
