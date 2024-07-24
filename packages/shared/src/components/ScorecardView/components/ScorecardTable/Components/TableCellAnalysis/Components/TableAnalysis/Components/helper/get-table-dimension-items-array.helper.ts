import { map } from "lodash";

export function getTableDimensionItemsArray(
	dimensionItems: any,
	analyticsObject: any,
) {
	return map(dimensionItems, (dimensionItem) => {
		const metadataIds = analyticsObject.metaData[dimensionItem];
		return map(metadataIds || [], (metadataId) => {
			const metadataName =
				analyticsObject &&
				analyticsObject.metaData &&
				analyticsObject.metaData.names
					? analyticsObject.metaData.names[metadataId]
					: "";
			return {
				id: metadataId,
				name: metadataName,
			};
		});
	});
}
