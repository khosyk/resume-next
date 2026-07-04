import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
	...compat.extends("next/core-web-vitals", "next/typescript"),
	prettier,
	{
		rules: {
			"no-console": ["warn", { allow: ["warn", "error"] }],
		},
	},
	{
		files: ["scripts/**/*.mjs"],
		rules: {
			"no-console": "off",
		},
	},
	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"dist/**",
		"node_modules/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
