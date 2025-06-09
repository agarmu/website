const headingFonts = ["IBM Plex Serif", "serif"]
const sansFonts = ['IBM Plex Sans Variable', "sans-serif"];
const monoFonts = ['IBM Plex Mono', 'monospace'];

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		typography: (theme) => ({
			DEFAULT: {
				css: {
					"color": theme("colors.slate.700"),
					"fontFamily": sansFonts,
					"a": {
						"text-decoration": "underline",
						"font-weight": 600,
						"&:hover": {
							color: theme("colors.slate.500"),
						},
					},
					"body": {
						"font-family": sansFonts,
					},
					"p": {
						"width": "100%",
						"font-family": sansFonts,
					},
					"blockquote": {
						"display": "block",
						"font-style": "italic",
						"margin-left": "1.5em",
						"margin-right": "3em",
						"padding-left": "0.5em",
						"border-left-width": "0.25em",
						"border-left-color": theme("colors.slate.500"),
						"font-size": "0.8em",
					},
					"h1": {
						"color": theme("colors.zinc.700"),
						"font-weight": "bold",
						"font-family": headingFonts,
					},
					"h2": {
						"color": theme("colors.zinc.700"),
						"font-weight": "bold",
						"font-family": headingFonts,
					},
					"h3": {
						"color": theme("colors.zinc.700"),
						"font-weight": "bold",
						"font-family": headingFonts,
					},
					"h4": {
						"color": theme("colors.zinc.700"),
						"font-weight": "bold",
						"font-family": headingFonts,
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
					"ul": {
						"list-style-type": "disc",
						"margin-left": "2em",
					},
					"ol": {
						"list-style-type": "decimal",
						"margin-left": "2em",
					},
					"code": {
						"font-family": monoFonts,
					},
					"pre": {
						"font-family": monoFonts,
					},
					".footnotes ol": {
						"list-style-type": "decimal",
						"margin-left": "2.5em",
						"margin-right": "3em",
					},
				},
			},
			sm: {
				css: {
					"font-size": "1rem",
					"line-height": "1.5rem",
					".katex": {
						"font-size": "1em !important",
					},
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
					"h4": {
						"font-size": "1.125rem",
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
					".footnotes": {
						"font-size": "0.875rem",
						"line-height": "1.25rem",
					},
					".footnotes pre": {
						"font-size": "0.875rem",
						"line-height": "1.25rem",
					},
				},
			},
			base: {
				css: {
					"font-size": "1.125rem",
					"line-height": "1.75rem",
					".katex": {
						"font-size": "1em !important",
					},
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
					"h4": {
						"font-size": "1rem",
						"line-height": "1.25rem",
						"margin-top": "0.4375rem",
						"margin-bottom": "0.4375rem",
					},
					"pre": {
						"margin-left": "1rem",
						"margin-right": "1rem",
						"font-size": "1rem",
						"line-height": "1.5rem",
						"padding": "1rem",
						"border-radius": "1rem",
					},
					".footnotes": {
						"font-size": "1rem",
						"line-height": "1.5rem",
					},
					".footnotes pre": {
						"font-size": "1rem",
						"line-height": "1.5rem",
					},
				},
			},
		}),
		extend: {
			fontFamily: {
				sans: sansFonts,
				serif: headingFonts,
				mono: monoFonts,
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
