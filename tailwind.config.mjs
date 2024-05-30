/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		typography: (theme) => ({
			DEFAULT: {
				css: {
					color: theme("colors.slate.700"),
					a: {
						"text-decoration": "underline",
						"font-weight": 600,
						"&:hover": {
							color: theme("colors.slate.500"),
						},
					},
				},
			},
		}),
	},
	plugins: [require("@tailwindcss/typography")],
}
