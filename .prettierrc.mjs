// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
	useTabs: true,
	semi: false,
	quoteProps: "consistent",
	bracketSpacing: true,
}
