import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_MD = ["**/*.md"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_COMPONENT = ["components/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

export default tseslint.config(
  {
    extends: [
    ],
    files: [...GLOB_MD, ...GLOB_MDX],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "warn",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    files: GLOB_MDX,
    rules: {
      "markdown/no-html": "off",
    },
  },
  {
    extends: [],
    files: GLOB_TS,
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    files: TSCONFIG.include,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "@eslint-react/naming-convention/filename": ["error", { rule: "kebab-case" }],
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: GLOB_COMPONENT,
    rules: {
      "@eslint-react/naming-convention/filename": ["error", { rule: "PascalCase" }],
    },
  },
  {
    extends: [
    ],
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },
);
