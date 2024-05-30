/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly AIRTABLE_API_KEY: string
	readonly AIRTABLE_PHOTOS_BASE_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
