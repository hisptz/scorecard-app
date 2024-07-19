import { DATASTORE_WIDGET_NAMESPACE } from "../constants/scorecard";

const widgetNamespace = `dataStore/${DATASTORE_WIDGET_NAMESPACE}`;
const loadAllQuery = {
	widgets: {
		resource: widgetNamespace,
	},
};

const loadQuery = {
	widget: {
		resource: widgetNamespace,
		id: ({ id }: any) => id,
	},
};

export async function loadAll(engine: any) {
	try {
		const response = await engine.query(loadAllQuery);
		return { widgets: response?.widgets };
	} catch (e) {
		return { error: e };
	}
}

export async function load(id = "", engine: any) {
	if (id) {
		try {
			const response = await engine.query(loadQuery, { variables: { id } });
			return { widget: response?.widget };
		} catch (e) {
			return { error: e };
		}
	}
	return { error: "not found" };
}

export async function createWidget(widget: any, dashboardId: any, engine: any) {
	const addWidgetMutation = {
		type: "create",
		resource: `${widgetNamespace}/${dashboardId}`,
		data: ({ data }: any) => data,
	};
	try {
		const response = await engine.mutate(addWidgetMutation, {
			variables: { data: widget },
		});
		return { widget: response };
	} catch (e) {
		return { error: e };
	}
}
