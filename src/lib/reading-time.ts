import { toString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

function calculateReadingTime(tree: unknown, { data }: any) {
	const textOnPage = toString(tree)
	const readingTime = getReadingTime(textOnPage)
	data.astro.frontmatter.readingTime = readingTime.text
}

export default function remarkReadingTime() {
	return calculateReadingTime
}
