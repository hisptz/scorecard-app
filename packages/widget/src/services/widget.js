import {DATASTORE_WIDGET_NAMESPACE} from "../constants/scorecard"

const widgetNamespace = `dataStore/${DATASTORE_WIDGET_NAMESPACE}`
const loadAllQuery = {
    widgets: {
        resource: widgetNamespace,
    }
}

const loadQuery = {
    widget: {
        resource: widgetNamespace,
        id: ({id}) => id,
    }
}

export async function loadAll(engine) {
    try {
        const response = await engine.query(loadAllQuery);
        return {widgets: response?.widgets};
    } catch (e) {
        return {error: e};
    }
}

export async function load(id = "", engine) {
    if (id) {
        try {
            const response = await engine.query(loadQuery, {variables: {id}});
            return {widget: response?.widget};
        } catch (e) {
            return {error: e};
        }
    }
    return {error: "not found"};
}

export async function createWidget(widget, dashboardId, engine) {
    const addWidgetMutation = {
        type: "create",
        resource: `${widgetNamespace}/${dashboardId}`,
        data: ({data}) => data,
    };
    try {
        const response = await engine.mutate(addWidgetMutation, {variables: {data: widget}});
        return {widget: response};
    } catch (e) {
        return {error: e};
    }
}
