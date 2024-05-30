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
	integrations: [tailwind(), sitemap(), mdx()],
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
			footnoteLabelTagName: "h3",
		},
	},
	image: {
		domains: ["v5.airtableusercontent.com"],
	},
})
