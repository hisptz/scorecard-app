import { filter } from "lodash";

export function getMatchingTableRowsOrColumns(tableDataRowOrColumn: any) {
	return filter(
		filter(tableDataRowOrColumn, (tableDataCell) => tableDataCell.dataRowIds),
	);
}
