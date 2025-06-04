import type { NaiveImage } from "./airtableImage"

export default interface Photo {
	id: string
	date: Date
	title: string
	description: string
	place: string
	photo: NaiveImage
}
