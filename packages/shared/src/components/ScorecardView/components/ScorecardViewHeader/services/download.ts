import i18n from "@dhis2/d2-i18n";
import { saveAs } from "file-saver";
import { find, flatten, forIn, set } from "lodash";
import { utils as xlsx, writeFile } from "xlsx";
import { ALMA_HEADERS } from "../../../../../constants";

function generateExcelJSON({
	periods = [],
	data = {},
	orgUnits = [],
	dataSources = [],
}: any) {
	return orgUnits?.map(({ displayName: orgUnitName, id: orgUnitId }: any) => {
		const object: any = { "Organisation Unit": orgUnitName };
		for (const dataSource of dataSources) {
			const {
				id: dataSourceId,
				displayName: dataSourceName,
				label: dataSourceLabel,
			} = dataSource ?? {};
			for (const period of periods) {
				const { id: periodId, name: periodName } = period ?? {};
				object[`${dataSourceName ?? dataSourceLabel}-${periodName}`] =
					data[`${dataSourceId}_${orgUnitId}_${periodId}`]?.current;
			}
		}
		return object;
	});
}

function downloadExcelFileTypes({
	periods,
	data,
	orgUnits,
	dataHolders,
	title,
	type,
}: any) {
	try {
		const json = generateExcelJSON({
			periods,
			data,
			orgUnits,
			dataSources: flatten(
				dataHolders?.map(({ dataSources }: any) => dataSources),
			),
		});
		const sheet = xlsx.json_to_sheet(json);
		const workbook = xlsx.book_new();
		xlsx.book_append_sheet(workbook, sheet, `${title}`);
		writeFile(workbook, `${title}.${type}`);
	} catch (e) {
		return e;
	}
}

export function downloadExcel({
	periods,
	data,
	orgUnits,
	dataHolders,
	title,
}: any) {
	return downloadExcelFileTypes({
		periods,
		data,
		orgUnits,
		dataHolders,
		title,
		type: "xlsx",
	});
}

export function getALMAMetadata({
	orgUnits,
	dataSources,
	periods,
	legendDefinitions,
}: any) {
	function getMetadataDimensions(
		orgUnits: any,
		dataSources: any,
		periods: any,
	) {
		return {
			ou: orgUnits?.map(({ id }: any) => id),
			pe: periods?.map(({ id }: any) => id),
			dx: dataSources?.map(({ id }: any) => id),
			co: [],
		};
	}

	function getAllLegends(legends: any) {
		if (Array.isArray(legends)) {
			return legends?.map(({ startValue, endValue, legendDefinitionId }) => ({
				min: startValue,
				max: endValue,
				color: find(legendDefinitions, ["id", legendDefinitionId])?.color,
			}));
		} else {
			const modifiedLegends: any = {};

			forIn(legends, (value, key) => {
				modifiedLegends[key] = value?.map(
					({ startValue, endValue, legendDefinitionId }: any) => ({
						min: startValue,
						max: endValue,
						color: find(legendDefinitions, ["id", legendDefinitionId])?.color,
					}),
				);
			});
			return modifiedLegends;
		}
	}

	function getMetadataItems(orgUnits: any, dataSources: any) {
		const items = {};

		for (const dataSource of dataSources) {
			const { displayName, id, legends } = dataSource ?? {};
			set(items, [id], {
				name: displayName,
				legendSet: getAllLegends(legends),
			});
		}

		for (const orgUnit of orgUnits) {
			const { id, displayName } = orgUnit ?? {};
			set(items, [id], {
				name: displayName,
			});
		}

		set(items, "dx", { name: i18n.t("Data") });
		set(items, "pe", { name: i18n.t("Period") });
		set(items, "ou", { name: i18n.t("Organisation Unit") });

		return items;
	}

	return {
		dimensions: getMetadataDimensions(orgUnits, dataSources, periods),
		items: getMetadataItems(orgUnits, dataSources),
	};
}

function getALMAData(data: any) {
	const rows: any = [];

	forIn(data, (value, key) => {
		const [dx, ou, pe] = key?.split("_");
		rows.push([dx, pe, ou, value?.current]);
	});

	return rows;
}

export function downloadALMAData({
	periods,
	data,
	orgUnits,
	dataHolders,
	title,
	legendDefinitions,
}: any) {
	try {
		const json = JSON.stringify({
			dataValues: [
				{
					headers: ALMA_HEADERS,
					metaData: getALMAMetadata({
						orgUnits,
						dataSources: flatten(
							dataHolders?.map(({ dataSources }: any) => dataSources),
						),
						periods,
						legendDefinitions,
					}),
					rows: getALMAData(data),
				},
			],
		});

		const blob = new Blob([json], { type: "application/json" });

		saveAs(blob, `${title}.json`);
	} catch (e) {
		return e;
	}
}

export function downloadALMAMeta({ orgUnits, dataHolders, title }: any) {
	try {
		const json = JSON.stringify({
			organisationUnits: orgUnits?.map(
				({ id, level, displayName, path }: any) => {
					const pathArray = path.split("/");

					const parent =
						pathArray.length >= 2
							? pathArray?.[pathArray.length - 2] ?? ""
							: "";
					return {
						id,
						name: displayName,
						level: level ?? path?.split("/")?.length - 1,
						parent:
							pathArray.length <= 2
								? {
										id: parent,
								  }
								: undefined,
					};
				},
			),
			indicators: flatten(
				dataHolders?.map(({ dataSources }: any) =>
					dataSources?.map(({ id, displayName }: any) => ({
						id,
						name: displayName,
					})),
				),
			),
		});
		const blob = new Blob([json], { type: "application/json" });

		saveAs(blob, `${title}-metadata.json`);
	} catch (e) {
		return e;
	}
}

export function downloadCSV({
	periods,
	data,
	orgUnits,
	dataHolders,
	title,
}: any) {
	return downloadExcelFileTypes({
		periods,
		data,
		orgUnits,
		dataHolders,
		title,
		type: "csv",
	});
}

export function downloadPDF() {}
