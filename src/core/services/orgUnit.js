import {omitBy} from "lodash";

export function getOrgUnitsFromAnalytics(analytics) {
    const {metaData} = analytics ?? {};
    const {ouHierarchy, items, ouNameHierarchy, dimensions} = metaData ?? {};
    const cleanedOuHierarchy = omitBy(ouHierarchy, (ou) => !ou);
    return dimensions?.ou?.map(ou => ({
        id: ou,
        displayName: items?.[ou]?.name,
        path: `${cleanedOuHierarchy?.[ou] ?? ""}/${ou}`,
        level: (cleanedOuHierarchy?.[ou]?.split("/")?.length ?? 0) + 1,
        hierarchy: ouNameHierarchy?.[ou]?.replace("/", "")
    }));
}


export function isOrgUnitId(id) {
    return !id.match(/(LEVEL-)|(USER_)|(OU_GROUP-)\w+/)
}
