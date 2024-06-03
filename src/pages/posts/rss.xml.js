import rss, { pagesGlobToRssItems } from "@astrojs/rss"

export async function GET(context) {
	return rss({
		title: "Mukul's Blog",
		description: "Mukul Agarwal's Personal Blog",
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
		},
		site: context.site + "/posts/",
		items: await pagesGlobToRssItems(import.meta.glob("./*.md")),
		customData: [
			"<language>en-us</language>",
			`<atom:link href="${context.site + "posts/rss.xml"}" rel="self" type="application/rss+xml" />`,
		].join(""),
	})
}
