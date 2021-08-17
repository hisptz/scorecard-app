/* eslint-disable react/prop-types */
import {
  DataTable,
  TableHead,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
} from '@dhis2/ui'
import { isEqual, uniqWith, uniq } from 'lodash'
import React, { Suspense } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { DataState } from '../../state/data'
import { LayoutState } from '../../state/layout'

const columnAtom = atom({
  key: 'columnAtomState',
  default: [],
})
// const spanSelector = selector({
//     key:'tableSpanSelector',
//     get:({get})=>{
//    let columns = get(columnAtom);
//    let rows = get(rowAtom);
//    console.log("your rowsx columns lenght is "+ columns?.length*rows?.length)
//     }
// })

const rowAtom = atom({
  key: 'rowAtomState',
  default: [],
})

const filterAtom = atom({
  key: 'filterAtomState',
  default: [],
})

const filterSpanAtom = atom({
  key: 'filterSpanAtomState',
  default: 0,
})

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
  )
}

const ColumnComponent = () => {
  const columnDataState = useRecoilValue(columnAtom)
  const defaultDataState = useRecoilValue(DataState)
  const setFilterStanState = useSetRecoilState(filterSpanAtom)

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {setFilterStanState.length < 1 ? '' : <FilterComponent />}
      </Suspense>
      <DataTableRow width={'100%'}>
        <td style={{ backgroundColor: '#F0F0F0' }}>
          <DataTableCell width={'1%'} fixed />
        </td>
        <td style={{ width: 50 + '%' }}>
          {columnDataState?.map((cols, index) => {
            return (
              <DataTableRow key={'cols-table' + index}>
                {columnDataState[
                  index == 0
                    ? columnDataState.length - (columnDataState.length - index)
                    : columnDataState.length -
                      (columnDataState.length - index) -
                      1
                ]?.map(() => {
                  return cols?.map((dataColsValueId, indexPosition) => {
                    setFilterStanState(
                      columnDataState[index]?.length *
                        columnDataState[columnDataState.length - (index + 1)]
                          .length +
                        1,
                    )
                    return (
                      <DataTableCell
                        width={'1%'}
                        fixed
                        key={'cells-table' + index + indexPosition}
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
                        {defaultDataState['_data']['metaData']['names'][
                          dataColsValueId
                        ] ?? ''}{' '}
                      </DataTableCell>
                    )
                  })
                })}
              </DataTableRow>
            )
          })}
        </td>
      </DataTableRow>
      {/* <DataTableCell fixed align="left" width={"50%"}/>

<DataTableCell align='center' fixed top={"0"} left={"50px"} width={"300px"} bordered
               className='' rowSpan={""}>
    <p> Organisation Unit</p>
  
</DataTableCell> */}
    </>
  )
}
const FilterComponent = () => {
  const filterDataState = useRecoilValue(filterAtom)
  const defaultDataState = useRecoilValue(DataState)
  const filterSpanState = useRecoilValue(filterSpanAtom)

  return (
    <>
      <DataTableRow>
        <DataTableColumnHeader colSpan={filterSpanState}>
          <b>
            {uniq(filterDataState)
              .map((filtersObjectsId) => {
                return (
                  defaultDataState['_data']['metaData']['names'][
                    filtersObjectsId
                  ] ?? ''
                )
              })
              .join('  ')}
          </b>
        </DataTableColumnHeader>
      </DataTableRow>
    </>
  )
}

const RowComponent = () => {
  const rowDataState = useRecoilValue(rowAtom)
  const defaultDataState = useRecoilValue(DataState)
  return (
    <>
      <td>
        <DataTableRow width={'100%'}>
          <DataTableCell fixed left={'0'} width={'1%'} />
          {rowDataState?.map((rows, index) => {
            return rowDataState[
              index == 0
                ? rowDataState.length - (rowDataState.length - index)
                : rowDataState.length - (rowDataState.length - index) - 1
            ].map(() => {
              return (
                <>
                  <DataTableCell fixed bordered key={'rows-state' + index}>
                    {rows?.map((rowsInCells, cellsPositions) => {
                      return (
                        <DataTableRow
                          align="center"
                          height="7000px"
                          key={'rowsInCells' + cellsPositions}
                          bordered
                        >
                          {defaultDataState['_data']['metaData']['names'][
                            rowsInCells
                          ] ?? ''}
                        </DataTableRow>
                      )
                    })}
                  </DataTableCell>
                </>
              )
            })
          })}
        </DataTableRow>
      </td>
      {/* <td style={{ width: 50 +'%' }}>
    datas
</td> */}
      {}

      {/* {
        <DataTableRow > 
          {rowDataState?.map((rows, index) => {
            return (
              <>
                <DataTableCell rowSpan={'8'} fixed bordered key={'rows-state' + index}>
                  {rows?.map((rowsInCells, cellsPositions) => {
                    return (
                      <DataTableRow
                        align="center"
                        height="700px"
                        key={'rowsInCells' + cellsPositions}
                        bordered
                      >
                        {defaultDataState['_data']['metaData']['names'][
                          rowsInCells
                        ] ?? ''}
                      </DataTableRow>
                    )
                  })}
                </DataTableCell>
              </>
            )
          })}
        </DataTableRow>
      } */}
    </>
  )
}
export default function TableAnalysis() {
  const layout = useRecoilValue(LayoutState)

  const data = useRecoilValue(DataState)

  const setdataFilter = useSetRecoilState(filterAtom)
  const setdataColumn = useSetRecoilState(columnAtom)
  const setdataRow = useSetRecoilState(rowAtom)

console.log("cangerlle  "+  layout.filter)
console.log(" and data are "+ data)
  layout['filter']?.forEach((filterObject) => {
    console.log('in filters are  ')
    setdataFilter((filters) => {
      return [...filters, ...data['_data']['metaData'][filterObject]]
    })
  })

  layout['column']?.forEach((columnObject) => {
    setdataColumn((columnsObjects) => {
      return uniqWith(
        [...columnsObjects, [...data['_data']['metaData'][columnObject]]],
        isEqual,
      )
    })
  })

  layout['rows']?.forEach((rowObject) => {
    setdataRow((rowsObjects) => {
      return uniqWith(
        [...rowsObjects, [...data['_data']['metaData'][rowObject]]],
        isEqual,
      )
    })
  })

  return (
    <div
      className="column align-items-center center"
      style={{ minHeight: 500 }}
    >
      <TableData width="100%" />
    </div> // TODO: @danford
  )
}
