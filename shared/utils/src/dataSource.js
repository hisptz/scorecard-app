const identifiableObjectsQuery = {
    object: {
        resource: "identifiableObjects",
        id: ({id}) => id,
    }
}

function getResourceFromHref(href) {
    const resource = href.split("/");
    return resource[resource.length - 2];
}

function getTypeFromResource(resource) {
    switch (resource) {
        case "indicators":
            return "indicator";
        case "dataElements":
            return "dataElement";
        case "dataSets":
            return "dataSet";
        case "programIndicators":
            return "programIndicator";
        case "eventDataItems":
            return "dataElement";
        default:
            return resource;
    }
}

export async function getDataSourceDetails(engine, dataSourceId) {
    try {
        const {object} = await engine.query(identifiableObjectsQuery, {variables: {id: dataSourceId}}) ?? {};
        if (object.href) {
            const resource = getResourceFromHref(object.href);
            return {
                type: getTypeFromResource(resource),
                name: object.displayName ?? object.name
            };
        }
        return null;
    } catch (e) {
        return null;
    }
}
