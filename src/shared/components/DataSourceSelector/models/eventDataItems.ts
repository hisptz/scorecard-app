import { filter as _filter, isEmpty } from "lodash";
import NativeDataSource from "./nativeDataSource";

export default class EventDataItems extends NativeDataSource {
	constructor() {
		super({
			label: "Event Data Items",
			resource: "programTrackedEntityAttributes",
			dimensionItemType: "[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]",
			filterType: "in",
			groupKey: "programId",
			groupResource: "programs",
			type: "dataElement",
		});

		this.dataSourcesQuery = {
			attributes: {
				resource: "programs",
				id: ({ id }: any) => id,
				params: {
					fields: [
						"id",
						"programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,valueType]]",
					],
				},
			},
			dataElements: {
				resource: "programDataElements",
				params: ({ id, page, filter }: any) => ({
					program: id,
					page,
					filter: [`valueType:eq:NUMBER`, ...filter],
					fields: ["dataElement[id,displayName]", "displayName", "valueType"],
				}),
			},
		};
	}

	async getDataSources(engine: any, { page, programId, searchKeyword }: any) {
		if (!isEmpty(programId)) {
			const response = await engine?.query(this.dataSourcesQuery, {
				variables: {
					page,
					id: programId,
					filter: searchKeyword ? [`displayName:ilike:${searchKeyword}`] : [],
				},
			});
			const trackedEntityAttributes = _filter(
				response?.sources?.programTrackedEntityAttributes?.map(
					({ trackedEntityAttribute }: any) => trackedEntityAttribute,
				),
				["valueType", "NUMBER"],
			);
			const filteredTrackedEntityAttributes = searchKeyword
				? _filter(trackedEntityAttributes, ({ displayName }) =>
						displayName
							.toLowerCase()
							.match(RegExp(searchKeyword.toLowerCase())),
				  )
				: trackedEntityAttributes;
			const dataElements = response?.dataElements?.programDataElements?.map(
				({ dataElement }: any) => dataElement,
			);
			return {
				data: [...filteredTrackedEntityAttributes, ...dataElements],
				pager: response?.dataElements?.pager,
			};
		}
		return {
			data: [],
			pager: {},
		};
	}

	async filter(engine: any, { page, selectedGroup, searchKeyword }: any) {
		return this.getDataSources(engine, {
			page,
			programId: selectedGroup?.id,
			searchKeyword,
		});
	}
}
