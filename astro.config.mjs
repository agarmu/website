import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkReadingTime from "./src/lib/reading-time"

// https://astro.build/config
export default defineConfig({
	site: "https://agarmu.com/",
	integrations: [tailwind({
		applyBaseStyles: false,
	}), sitemap(), mdx()],
	markdown: {
		smartypants: true,
		shikiConfig: {
			theme: "catppuccin-latte",
			wrap: true,
		},
		remarkPlugins: [remarkMath, remarkReadingTime],
		rehypePlugins: [rehypeKatex],
		remarkRehype: {
			footnoteLabel: "Footnotes",
			footnoteLabelTagName: "h4",
		},
	},
	image: {
		domains: ["v5.airtableusercontent.com"],
	},
})
