import { ScorecardDataHolder } from "@hisptz/dhis2-analytics";

export function getChunkChildIndex(
	chunkSize = 2,
	chunkIndex: any,
	childIndex: any
) {
	return chunkSize * chunkIndex + childIndex;
}

export function customChunk(list: ScorecardDataHolder[],) {
	const chunks = [];
	const listToModify: ScorecardDataHolder[] = [...list];
	const i = 0;

	while (listToModify.length > 0) {
		if (listToModify[i]?.dataSources.length > 1) {
			chunks.push(listToModify.splice(i, 1));
			continue;
		}
		if (
			listToModify[i]?.dataSources?.length < 2 &&
			listToModify[i + 1]?.dataSources?.length < 2
		) {
			chunks.push(listToModify.splice(i, 2));
			continue;
		}
		chunks.push(listToModify.splice(i, 1));
	}

	return chunks;
}
