import { map, last } from "lodash";

export function getTableRowsUpdatedWithColumnsMetadata(
	tableConfiguration: any,
	tableRowsArray: any,
	tableColumnsArray: any,
) {
	return map(tableRowsArray, (tableRow) => {
		return [
			...tableRow,
			...map(last(tableColumnsArray), (tableDataCell: any) => {
				const lastTableRow: any = last(tableRow);
				const rowPaths =
					lastTableRow && lastTableRow.path ? lastTableRow.path.split("/") : [];
				const columnPaths =
					tableDataCell && tableDataCell.path
						? tableDataCell.path.split("/")
						: [];

				const dataRowIds = [...rowPaths, ...columnPaths];
				return {
					id: dataRowIds.join("_"),
					isDataCell: true,
					dataDimensions: [
						...tableConfiguration.row,
						...tableConfiguration.column,
					],
					dataRowIds,
				};
			}),
		];
	});
}
