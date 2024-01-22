import {map} from "lodash";
import {getMergedTableRowsOrColumnsDetails} from "./get-merged-table-rows-or-columns-details.helper";

export function getMergedTableRows(tableDataRows, dxGroupMembers) {
    const {availableParent, mergedDataRowsOrColumnsArray} =
        getMergedTableRowsOrColumnsDetails(tableDataRows, dxGroupMembers);

    return map(mergedDataRowsOrColumnsArray, (mergedDataRows) =>
        map(mergedDataRows, (mergedDataCell) => {
            return {
                ...mergedDataCell,
                rowSpan: availableParent[mergedDataCell.id],
            };
        })
    );
}
