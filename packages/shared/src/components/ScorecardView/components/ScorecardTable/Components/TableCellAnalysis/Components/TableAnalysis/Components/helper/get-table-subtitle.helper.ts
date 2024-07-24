import { map } from "lodash";

export function getTableSubtitle(
	tableConfiguration: any,
	analyticsObject: any,
) {
	return map(tableConfiguration.filter, (filter) =>
		map(
			analyticsObject && analyticsObject.metaData
				? analyticsObject.metaData[filter] || []
				: [],
			(itemId) =>
				analyticsObject &&
				analyticsObject.metaData &&
				analyticsObject.metaData.names
					? analyticsObject.metaData.names[itemId] || []
					: [],
		).join(", "),
	).join(" - ");
}
