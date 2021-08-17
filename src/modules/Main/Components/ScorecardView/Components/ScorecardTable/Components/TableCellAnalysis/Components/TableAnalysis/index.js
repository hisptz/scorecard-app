/* eslint-disable react/prop-types */
import { useAlert } from '@dhis2/app-runtime'
import {
  DataTable,
  TableHead,
  DataTableBody,
  // TableFoot,
  DataTableRow,
  DataTableCell,
  DataTableColumnHeader,
} from '@dhis2/ui'
import { auto } from 'async'
import { color } from 'highcharts'
import { BackgroundColor } from 'jest-matcher-utils/node_modules/chalk'
import { flatten, isEqual, uniqWith, uniq } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, Suspense } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { PeriodResolverState } from '../../../../../../../../../../core/state/period'
import useTableAnalysisData from './hooks/useTableAnalysisData'

const dataDefaults = {
  column: ['dx'],
  rows: ['pe','ou'],
  filter: [],
}

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
const dataAtomAtom = atom({
  key: 'dataState',
  default: undefined,
})

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
  const defaultDataState = useRecoilValue(dataAtomAtom)
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
        <td style={{ width: 50 +'%' }}>
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
  const defaultDataState = useRecoilValue(dataAtomAtom)
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
  const defaultDataState = useRecoilValue(dataAtomAtom)

  return (
    <>

<td>
  
    <DataTableRow  width={'100%'} >  
    <DataTableCell fixed left={"0"} width={"1%"}/>
   {rowDataState?.map((rows, index) => {
            return rowDataState[
                index == 0
                ? rowDataState.length - (rowDataState.length - index)
                : rowDataState.length -
                  (rowDataState.length - index) -
                  1
            ].map(()=>{
                return (
                    <>
                      <DataTableCell  fixed bordered key={'rows-state' + index} >
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
                  );
            })
          })}
        </DataTableRow>
</td>
{
/* <td style={{ width: 50 +'%' }}>
    datas
</td> */

}
{


    
      }

























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
export default function TableAnalysis({ dimensions }) {
  const { orgUnitSelection, layout, dataSources } = dimensions ?? {}
  const periods = useRecoilValue(PeriodResolverState)
  const { loading, data, error } = useTableAnalysisData({
    orgUnits: orgUnitSelection?.orgUnits,
    periods,
    dataSources,
  })
  const { row, column, filter } = layout ?? {}
  const { show } = useAlert(
    ({ message }) => message,
    ({ type }) => ({ ...type, duration: 3000 }),
  )
  const setdataFilter = useSetRecoilState(filterAtom)
  const setdataColumn = useSetRecoilState(columnAtom)
  const setdataRow = useSetRecoilState(rowAtom)
  const setDefaultData = useSetRecoilState(dataAtomAtom)

  useEffect(() => {
    if (error) {
      show({ message: error?.message ?? error?.details ?? error?.toString() })
    }
  }, [error])

  if (loading) {
    return (
      <div
        className="column align-items-center center"
        style={{ minHeight: 500 }}
      >
        <h3>Loading...</h3>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="column align-items-center center"
        style={{ minHeight: 500 }}
      >
        <h3>{error?.message ?? error?.details ?? error?.toString()}</h3>
      </div>
    )
  }

  // // var mydefault = [];
  if (data === undefined) {
    return () => {
      setTimeout(() => {}, 3000)
    }
  }
  setDefaultData(data)
  console.log(data)

  dataDefaults['filter']?.forEach((filterObject) => {
    setdataFilter((filters) => {
      return [...filters, ...data['_data']['metaData'][filterObject]]
    })
  })

  dataDefaults['column']?.forEach((columnObject) => {
    setdataColumn((columnsObjects) => {
      return uniqWith(
        [...columnsObjects, [...data['_data']['metaData'][columnObject]]],
        isEqual,
      )
    })
  })

  dataDefaults['rows']?.forEach((rowObject) => {
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

TableAnalysis.propTypes = {
  dimensions: PropTypes.object.isRequired,
}
