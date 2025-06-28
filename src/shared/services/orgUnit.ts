import { omitBy } from "lodash";
import { Analytics } from "@hisptz/dhis2-utils";

export function getOrgUnitsFromAnalytics(
	analytics: Analytics & {
		metaData: Analytics["metaData"] & {
			ouHierarchy: Record<string, string>;
			ouNameHierarchy: Record<string, string>;
		};
	}
) {
	const { metaData } = analytics ?? {};
	const { ouHierarchy, items, ouNameHierarchy, dimensions } = metaData ?? {};
	const cleanedOuHierarchy = omitBy(ouHierarchy, (ou) => !ou);
	return dimensions?.ou?.map((ou) => {
		const path = `${cleanedOuHierarchy?.[ou] ?? ""}/${ou}`;
		return {
			id: ou,
			displayName: items?.[ou]?.name,
			path: path.startsWith("/") ? path : `/${path}`,
			level: (cleanedOuHierarchy?.[ou]?.split("/")?.length ?? 0) + 1,
			hierarchy: ouNameHierarchy?.[ou]?.replace("/", ""),
		};
	});
}

export function isOrgUnitId(id: string) {
	return !id.match(/(LEVEL-)|(USER_)|(OU_GROUP-)\w+/);
}
