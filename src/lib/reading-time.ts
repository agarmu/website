import getReadingTime from "reading-time"
import { toString } from "mdast-util-to-string"

function calculateReadingTime(tree: unknown, { data }: any) {
	const textOnPage = toString(tree)
	const readingTime = getReadingTime(textOnPage)
	data.astro.frontmatter.readingTime = readingTime.text
}

export default function remarkReadingTime() {
	return calculateReadingTime
}
