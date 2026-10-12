import { type CollectionEntry, getCollection } from "astro:content";

/** Fetch all talks, newest first. */
export async function getAllTalks(): Promise<CollectionEntry<"talk">[]> {
	const talks = await getCollection("talk");
	return talks.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
