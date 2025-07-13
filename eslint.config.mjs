import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";

export default defineConfig([
    ...new FlatCompat({
        baseDirectory: import.meta.dirname,
    }).extends("next/core-web-vitals", "next/typescript"),
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.mjs",
        ],
        rules: {
            "indent": "warn",
            "semi": "error",
            "quotes": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
]);