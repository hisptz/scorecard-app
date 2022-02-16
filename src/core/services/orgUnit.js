export function getOrgUnitsFromAnalytics(analytics) {
    const {metaData} = analytics ?? {};
    const {ouHierarchy, items, ouNameHierarchy, dimensions} = metaData ?? {};
    return dimensions?.ou?.map(ou => ({
        id: ou,
        displayName: items?.[ou]?.name,
        path: `/${ouHierarchy?.[ou]}/${ou}`,
        level: ouHierarchy?.[ou]?.split("/").length + 1,
        hierarchy: ouNameHierarchy?.[ou].replace("/", "")
    }));
}


export function isOrgUnitId(id) {
    return !id.match(/(LEVEL-)|(USER_)|(OU_GROUP-)\w+/)
}
