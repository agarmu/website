import type { NaiveImage } from "./airtableImage"

export default interface Photo {
	id: number
	date: Date
	title: string
	description: string
	place: string
	photo: NaiveImage
}
