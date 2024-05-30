import DefaultTheme from "tailwindcss/defaultTheme"

const serifFonts = ["Cormorant Garamond"]
const sansFonts = ["Open Sans Variable"]

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		typography: (theme) => ({
			DEFAULT: {
				css: {
					"color": theme("colors.slate.700"),
					"fontFamily": serifFonts,
					"a": {
						"text-decoration": "underline",
						"font-weight": 600,
						"&:hover": {
							color: theme("colors.slate.500"),
						},
					},
					"p": {
						width: "100%",
					},
					"h1": {
						"fontFamily": sansFonts,
						"font-weight": "bold",
					},
					"h2": {
						"fontFamily": sansFonts,
						"font-weight": "bold",
					},
					"h3": {
						"fontFamily": sansFonts,
						"font-weight": "bold",
					},
					"img": {
						width: "75%",
						margin: "auto",
					},
					"img + em": {
						"text-align": "center",
						"width": "75%",
						"margin": "auto",
					},
				},
			},
			sm: {
				css: {
					"font-size": "1rem",
					"line-height": "1.5rem",
					"p": {
						"margin-top": "0.5rem",
						"margin-bottom": "0.5rem",
					},
					"h1": {
						"font-size": "1.875rem",
						"line-height": "2.25rem",
						"margin-top": "0.6rem",
						"margin-bottom": "0.8rem",
					},
					"h2": {
						"font-size": "1.5rem",
						"line-height": "2rem",
						"margin-top": "0.5rem",
						"margin-bottom": "0.7rem",
					},
					"h3": {
						"font-size": "1.25rem",
						"line-height": "1.75rem",
						"margin-top": "0.5rem",
						"margin-bottom": "0.5rem",
					},
					"pre": {
						"margin-left": "0.25rem",
						"margin-right": "0.25rem",
						"font-size": "0.875rem",
						"line-height": "1.25rem",
						"padding": "0.5rem",
						"border-radius": "0.5rem",
					},
				},
			},
			base: {
				css: {
					"font-size": "1.125rem",
					"line-height": "1.75rem",
					"p": {
						"margin-top": "0.625rem",
						"margin-bottom": "0.625rem",
					},
					"h1": {
						"font-size": "2.25rem",
						"line-height": "2.5rem",
						"margin-top": "1rem",
						"margin-bottom": "1rem",
					},
					"h2": {
						"font-size": "1.875rem",
						"line-height": "2.25rem",
						"margin-top": "0.8rem",
						"margin-bottom": "0.8rem",
					},
					"h3": {
						"font-size": "1.5rem",
						"line-height": "2rem",
						"margin-top": "0.7rem",
						"margin-bottom": "0.7rem",
					},
					"pre": {
						"margin-left": "1rem",
						"margin-right": "1rem",
						"font-size": "1rem",
						"line-height": "1.5rem",
						"padding": "1rem",
						"border-radius": "1rem",
					},
				},
			},
		}),
		extend: {
			fontFamily: {
				sans: sansFonts,
				serif: serifFonts,
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
