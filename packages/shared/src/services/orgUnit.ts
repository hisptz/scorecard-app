import { omitBy } from "lodash";

export function getOrgUnitsFromAnalytics(analytics: any) {
	const { metaData } = analytics ?? {};
	const { ouHierarchy, items, ouNameHierarchy, dimensions } = metaData ?? {};
	const cleanedOuHierarchy = omitBy(ouHierarchy, (ou) => !ou);
	return dimensions?.ou?.map((ou: any) => {
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

export function isOrgUnitId(id: any) {
	return !id.match(/(LEVEL-)|(USER_)|(OU_GROUP-)\w+/);
}
