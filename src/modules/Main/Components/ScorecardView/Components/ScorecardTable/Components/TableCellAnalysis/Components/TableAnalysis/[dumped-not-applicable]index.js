/* eslint-disable react/prop-types */
import {
  DataTable,
  TableHead,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
} from "@dhis2/ui";
import { uniq } from "lodash";
import React, { Suspense } from "react";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
} from "recoil";
import { DataState } from "../../state/data";
import { LayoutState } from "../../state/layout";

const layoutStateAtom = selectorFamily({
  key: "layout-resource-atom",
  get:
    (resourceValue) =>
    ({ get }) => {
      const row = get(LayoutState)?.[resourceValue] ?? [];
      const data = get(DataState);
      return row.map((filterObject) => {
        return data?.["_data"]["metaData"][filterObject] ?? [];
      });
    },
});

const filterSpanAtom = atom({
  key: "filterSpanAtomState",
  default: 0,
});

const TableData = () => {
  return (
    <DataTable>
      <TableHead>
        <ColumnComponent />
      </TableHead>
      <DataTableBody>
        <RowComponent />
      </DataTableBody>
    </DataTable>
  );
};

const ColumnComponent = () => {
  const columnDataState = useRecoilValue(layoutStateAtom("column"));
  const defaultDataState = useRecoilValue(DataState);
  const setFilterStanState = useSetRecoilState(filterSpanAtom);
  const filterDataState = useRecoilValue(layoutStateAtom("filter"));
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {filterDataState.length < 1 ? "" : <FilterComponent />}
      </Suspense>
      <DataTableRow width={"100%"}>
        <td style={{ backgroundColor: "#F3F5F7" }}>
          <DataTableCell
            width={"1%"}
            style={{ backgroundColor: "#F3F5F7" }}
            fixed
          />
        </td>
        <td>
          {columnDataState?.map((cols, index) => {
            return (
              <DataTableRow key={"cols-table" + index}>
                {index == 0
                  ? cols?.map((dataColsValueId, indexPosition) => {
                      setFilterStanState(
                        columnDataState[index]?.length *
                          columnDataState[columnDataState.length - (index + 1)]
                            .length +
                          1
                      );
                    
                      return (
                        <DataTableCell
                          width={"12%"}
                          fixed
                          key={"cells-table" + index + indexPosition}
                          colSpan={
                            columnDataState[index + 1]?.length 
                          }
                          bordered
                        >
                          {defaultDataState["_data"]["metaData"]["names"][
                            dataColsValueId
                          ] ?? ""}{" "}
                        </DataTableCell>
                      );
                    })
                  : columnDataState[
                      columnDataState.length -
                        (columnDataState.length - index) -
                        1
                    ]?.map(() => {
                      return cols?.map((dataColsValueId, indexPosition) => {
                        setFilterStanState(
                          columnDataState[index]?.length *
                            columnDataState[
                              columnDataState.length - (index + 1)
                            ].length +
                            1
                        );
                        return (
                          <DataTableCell
                            width={"1%"}
                            fixed
                            key={"cells-table" + index + indexPosition}
                            colSpan={
                              columnDataState[index + 1]?.length *
                                columnDataState[columnDataState.length - 1]
                                  ?.length ===
                              isNaN
                                ? 1
                                : columnDataState[index + 1]?.length *
                                  columnDataState[columnDataState.length - 1]
                                    ?.length
                            }
                            bordered
                          >
                            {defaultDataState["_data"]["metaData"]["names"][
                              dataColsValueId
                            ] ?? ""}{" "}
                          </DataTableCell>
                        );
                      });
                    })}
              </DataTableRow>
            );
          })}
        </td>
      </DataTableRow>
    </>
  );
};

const FilterComponent = () => {
  const filterDataState = useRecoilValue(layoutStateAtom("filter"));
  const defaultDataState = useRecoilValue(DataState);
  const filterSpanState = useRecoilValue(filterSpanAtom);

  return (
    <>
      <DataTableRow>
        <DataTableColumnHeader colSpan={filterSpanState}>
          <b style={{ paddingLeft: "40%" }}>
            {filterDataState
              .map((filtersObjectsId) => {
                return filtersObjectsId.map((filterId) => {
                  return (
                    defaultDataState["_data"]["metaData"]["names"][filterId] ??
                    " "
                  );
                });
              })
              .join("  ")}
          </b>
        </DataTableColumnHeader>
      </DataTableRow>
    </>
  );
};

const RowComponent = () => {
  const rowDataState = useRecoilValue(layoutStateAtom("row"));
  const defaultDataState = useRecoilValue(DataState);
  const filterDataState = useRecoilValue(layoutStateAtom("filter"));
  const columnDataState = useRecoilValue(layoutStateAtom("column"));
  const layout = useRecoilValue(LayoutState);

  return (
    <>
      {rowDataState.length > 0 ? (
        <td>
          <tr
            width={"100%"}
            height={ (rowDataState?.length == 1 ? 1 * 40 : 1* 9 ) + 'px'}
            style={{
              backgroundColor: rowDataState?.length < 1 ? "white" : "#F3F5F7",
            }}
          >
            {/* <DataTableCell fixed left={'0'} width={'1%'} rowSpan={'1'} /> */}
            {rowDataState.length == 0 ? (
              <DataTableCell rowSpan={"1"} />
            ) : (
              <DataTableCell fixed left={"0"} width={"1%"} rowSpan={"1"} />
            )}
            {rowDataState?.map((rows, index) => {
              return index === 0 ? (
                <DataTableRow fixed bordered key={"rows-state" + index}>
                  <DataTableCell bordered fixed>
                    {rows?.map((rowsInCells, cellsPositions) => {
                      return (
                        <tr
                          key={"rowsInCells" + cellsPositions}
                          bordered
                          width={"100%"}
                          height={"40px"}
                        >
                          {defaultDataState["_data"]["metaData"]["names"][
                            rowsInCells
                          ] ?? ""}
                        </tr>
                      );
                    })}
                  </DataTableCell>
                </DataTableRow>
              ) : (
                rowDataState[
                  rowDataState.length - (rowDataState.length - index) - 1
                ].map(() => {
                  return (
                    <>
                      {rows.length > 0 ? (
                        <DataTableCell
                          fixed
                          bordered
                          key={"rows-state" + index}
                        >
                          {rows?.map((rowsInCells, cellsPositions) => {
                            return (
                              <tr
                                key={"rowsInCells" + cellsPositions}
                                bordered
                                width={"100%"}
                                height={"40px"}
                              >
                                {defaultDataState["_data"]["metaData"]["names"][
                                  rowsInCells
                                ] ?? ""}
                              </tr>
                            );
                          })}
                        </DataTableCell>
                      ) : (
                        <DataTableRow fixed bordered key={"rows-state" + index}>
                          <DataTableCell bordered fixed>
                            {rows?.map((rowsInCells, cellsPositions) => {
                              return (
                                <tr
                                  key={"rowsInCells" + cellsPositions}
                                  bordered
                                  width={"100%"}
                                  height={"40px"}
                                >
                                  {defaultDataState["_data"]["metaData"][
                                    "names"
                                  ][rowsInCells] ?? ""}
                                </tr>
                              );
                            })}
                          </DataTableCell>
                        </DataTableRow>
                      )}
                    </>
                  );
                })
              );
            })}
          </tr>
        </td>
      ) : (
        ""
      )}
      <td style={{ width: 50 + "%", backgroundColor: "white" }}>
        {layout.filter.length > 0 ? (
          layout.column.length > 0 ? (
            rowDataState.map((rows, index1) => {
              return index1 === 0 ? (
                <DataTableRow fixed bordered key={"rows-state" + index1}>
                  <DataTableCell>
                    {rows?.map((rowsInCells, cellsPositions) => {
                      return (
                        <tr
                          key={"rowsInCells" + cellsPositions}
                          bordered
                          width={"100%"}
                          height={"40px"}
                        >
                          {/* {defaultDataState['_data']['metaData']['names'][
                rowsInCells
              ] ?? ''} */}
                          {filterDataState
                            .map((filtersObjectsId) => {
                              return (
                                // defaultDataState['_data']['metaData']['names'][
                                //   filtersObjectsId
                                // ] ?? 'period filters',
                                columnDataState?.map((cols, index) => {
                                  return columnDataState[
                                    index == 0
                                      ? columnDataState.length -
                                        (columnDataState.length - index)
                                      : columnDataState.length -
                                        (columnDataState.length - index) -
                                        1
                                  ]?.map(() => {
                                    return cols?.map(
                                      (dataColsValueId, indexPosition) => {                                        
                                    if(cols.length >1 && rows.length< 2)
                                    {
                                      return defaultDataState["_data"][
                                        "rows"
                                      ][indexPosition][3];
                                    }else if(rows.length >1 && cols.length <2)
                                    {
                                      return defaultDataState["_data"][
                                        "rows"
                                      ][cellsPositions][3];
                                    }else {
                                      return defaultDataState["_data"][
                                        "rows"
                                      ][columnDataState.length - index1][3];
                                    }
                                      }
                                    );
                                  })
                                  .map((d,i) =>{
                                    return <DataTableCell key={i} bordered>{d}</DataTableCell>
                                  });
                                })
                              );
                            })}
                        </tr>
                      );
                    })}
                  </DataTableCell>
                </DataTableRow>
              ) : (
                rowDataState[
                  rowDataState.length - (rowDataState.length - index1) - 1
                ].map(() => {
                  return (
                    <>
                      {rows.length > 1 ? (
                        <DataTableCell bordered key={"rows-state" + index1}>
                          {rows?.map((rowsInCells, cellsPositions) => {
                            return (
                              <tr
                                key={"rowsInCells" + cellsPositions}
                                bordered
                                width={"100%"}
                                height={"40px"}
                              >
                                {
                                  defaultDataState["_data"]["rows"][
                                    cellsPositions
                                  ][3]
                                }
                              </tr>
                            );
                          })}
                        </DataTableCell>
                      ) : (
                        <DataTableRow bordered key={"rows-state" + index1}>
                          <DataTableCell bordered>
                            {rows?.map((rowsInCells, cellsPositions) => {
                              return (
                                <tr
                                  key={"rowsInCells" + cellsPositions}
                                  bordered
                                  style={{ border: "1pt solid black" }}
                                  width={"100%"}
                                  height={"40px"}
                                >
                                  {
                                    defaultDataState["_data"]["rows"][
                                      cellsPositions
                                    ][3]
                                  }
                                </tr>
                              );
                            })}
                          </DataTableCell>
                        </DataTableRow>
                      )}
                    </>
                  );
                })
              );
            })
          ) : (
            <div>d1</div>
          )
        ) : layout.column.length > 0 ? (
          layout.row.length > 0 ? (
            rowDataState.map((rows, index) => {
              return index === 0 ? (
              rows?.map((rowsInCells, cellsPositions) => {
                    return (
                     
                      <DataTableRow  key={"rows-state" + index}> 
                        {

columnDataState?.map((cols, index1) => {
  return columnDataState[
    columnDataState.length -
      (columnDataState.length - index1) -
      1
  ]?.map(() => {
    return  cols
      ?.map((dataColsValueId, indexPosition) => {
        console.log(defaultDataState["_data"]["rows"]);
        return   uniq(defaultDataState["_data"]["rows"][
          cellsPositions+index1 ][3]) ;
        })
     .map((v,index)=>{
       return <DataTableCell width={'10%'} key={index} bordered align="right">{v}</DataTableCell>
     })                        
       
    
   
  });
})
                        }
                      </DataTableRow>
                        
                      
                    );
                  })
              ) : (
                rowDataState[
                  rowDataState.length - (rowDataState.length - index) - 1
                ].map(() => {
                  return (
                    <>
                      {rows.length > 1 ? (
                        <DataTableRow bordered key={"rows-state" + index}>
                          {rows?.map((rowsInCells, cellsPositions) => {
                            return (
                              <tr
                                key={"rowsInCells" + cellsPositions}
                                bordered
                                width={"100%"}
                                height={"40px"}
                              >
                                {
                                  defaultDataState["_data"]["rows"][
                                    cellsPositions
                                  ][3]
                                }
                              </tr>
                            );
                          })}
                        </DataTableRow>
                      ) : (
                        <DataTableRow bordered key={"rows-state" + index}>
                          <DataTableCell bordered>
                            {rows?.map((rowsInCells, cellsPositions) => {
                              return (
                                <tr
                                  key={"rowsInCells" + cellsPositions}
                                  bordered
                                  style={{ border: "1pt solid black" }}
                                  width={"100%"}
                                  height={"40px"}
                                >
                                  {
                                    defaultDataState["_data"]["rows"][
                                      cellsPositions
                                    ][3]
                                  }
                                </tr>
                              );
                            })}
                          </DataTableCell>
                        </DataTableRow>
                      )}
                    </>
                  );
                })
              );
            })
          ) : (
            <div>datas</div>
          )
        ) : (
          <div>d2</div>
        )}
      </td>
      {}
    </>
  );
};

export default function TableAnalysis() {
  const data = useRecoilValue(DataState);
  console.log(data);
  return (
    <div
      className="column align-items-center center"
      style={{ minHeight: 500 }}
    >
      <TableData width="50%" />
    </div>
  );
}
