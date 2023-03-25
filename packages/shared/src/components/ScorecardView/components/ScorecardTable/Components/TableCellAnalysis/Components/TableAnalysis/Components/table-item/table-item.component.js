import React, {useMemo} from "react";
import "./table-item.component.css";
import {useRecoilValue} from "recoil";
import {DataState} from "../../../../state/data";
import {LayoutState} from "../../../../state/layout";
import drawBnaTable from "../helper/draw-analytics-table-helper";
import TableItemCellComponent from "../table-item-cell/table-item-cell.component";

export default function TableItemComponent() {
    const data = useRecoilValue(DataState);
    const layout = useRecoilValue(LayoutState);
    const tableData = useMemo(() => {
        return drawBnaTable(data["_data"], layout);
    }, [data, layout]);


    return (
        <div className="table-item-container">
            <table
                className="table table-bordered"
            >
                <thead>
                {tableData?.subtitle !== " " ? (
                    <tr>
                        <th
                            colSpan={tableData?.headerColSpan}
                            className="table-header-cell"
                        >
                            <div className="table-header-item">{tableData?.subtitle}</div>
                        </th>
                    </tr>
                ) : null}

                {tableData?.headers.map((tableHeaderRow, tableHeaderRowPosition) => {
                    return (
                        <tr key={tableHeaderRowPosition}>
                            {tableHeaderRow.map(
                                (tableHeaderCell, tableHeaderCellPosition) => {
                                    return (
                                        <th
                                            className="table-header-cell"
                                            key={tableHeaderCellPosition}
                                            rowSpan={tableHeaderCell.rowSpan}
                                            colSpan={tableHeaderCell.colSpan}
                                            style={{
                                                textAlign: tableHeaderCell.textCenter
                                                    ? "center"
                                                    : "left",
                                            }}
                                        >
                                            {tableHeaderCell.name}
                                        </th>
                                    );
                                }
                            )}
                        </tr>
                    );
                })}
                </thead>
                <tbody
                    // [@listEnter]
                >
                {tableData?.rows.map((tableRow, tableRowPosition) => {
                    return (
                        <tr key={"table-row" + tableRowPosition}>
                            {tableRow.map((tableCell, tableCellPosition) => {
                                return (
                                    <td
                                        className="table-item-cell-block"
                                        key={"table-row-item-cell" + tableCellPosition}
                                        rowSpan={tableCell.rowSpan}
                                    >
                                        {!tableCell.isDataCell ? (
                                            <span
                                                className="table-item-cell-label"
                                                key={"tableCellPosition" + tableCellPosition}
                                            >
                          {tableCell.name}
                        </span>
                                        ) : (
                                            <div
                                                className="table-item-cell-data"
                                                key={"tableCellPosition" + tableCellPosition}
                                            >
                                                <TableItemCellComponent
                                                    analyticsObject={data["_data"]}
                                                    dataRowIds={tableCell.dataRowIds}
                                                />
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
