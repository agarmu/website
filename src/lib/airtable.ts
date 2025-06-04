import Airtable from "airtable"
import { type NaiveImage } from "../interfaces/airtableImage"
import type Photo from "../interfaces/photo"

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_API_KEY }).base(
	import.meta.env.AIRTABLE_PHOTOS_BASE_ID,
)("table")

function retrievePhotoProps(record: any): Photo {
	let id = record.get("ID") as string
	let title = record.get("title") as string
	let desc = record.get("description") as string
	let place = record.get("place") as string
	let date = record.get("date") as string
	let photo = record.get("photo")[0]
	let res = {
		id: id,
		title: title,
		description: desc,
		place: place,
		date: new Date(date),
		photo: photo as NaiveImage,
	}
	return res as Photo
}

export async function fetchPhotos() {
	let request = await base.select({ view: "Grid view" }).all()
	let result = request.map(retrievePhotoProps)
	return result
}
