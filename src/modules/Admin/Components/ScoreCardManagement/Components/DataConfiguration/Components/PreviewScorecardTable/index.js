import {DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableRow} from '@dhis2/ui'
import {flattenDeep} from 'lodash'
import React, {useMemo} from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardConfigStateSelector} from "../../../../../../../../core/state/scorecard";
import PreviewCustomCell from "./Components/PreviewCustomCell";

export default function PreviewScorecardTable() {
    const {dataGroups} = useRecoilValue(ScorecardConfigStateSelector('dataSelection'))
    const columns = useMemo(() => [...dataGroups], [dataGroups]);
    return (
        <div className='column' style={{width: '100%', overflowX: 'auto'}}>
            <DataTable bordered width={"100%"}>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell align='center' className='table-header' bordered rowSpan={"2"}>Organisation
                            Unit</DataTableCell>
                        {
                            columns?.map(column => (
                                <DataTableCell align='center' className='table-header' bordered
                                               colSpan={column?.dataHolders?.length}
                                               key={column.id}>{column.title}</DataTableCell>))
                        }
                    </DataTableRow>
                    <DataTableRow>
                        {
                            flattenDeep(columns.map(({dataHolders}) => dataHolders)).map(({dataSources}) => (
                                <DataTableCell className='header-row' bordered key={dataSources[0]?.id}
                                               id={dataSources[0]?.id}>{dataSources[0]?.label} {dataSources.length > 1 && `/${dataSources?.[1]?.label}`}</DataTableCell>))
                        }
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    <DataTableRow bordered>
                        <DataTableCell tag="th" bordered>
                            Bo
                        </DataTableCell>
                        {
                            flattenDeep(columns?.map(({dataHolders}) => dataHolders)).map((config) => (
                                <PreviewCustomCell key={config.id} config={config}/>))
                        }
                    </DataTableRow>
                </DataTableBody>
            </DataTable>
        </div>
    )
}
