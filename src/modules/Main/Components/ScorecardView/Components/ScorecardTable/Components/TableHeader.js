import {DataTableCell, DataTableHead, DataTableRow} from '@dhis2/ui'
import React from 'react'
import {useRecoilValue} from "recoil";
import ScorecardConfState, {ScorecardViewSelector} from "../../../../../../../core/state/scorecard";


export default function TableHeader() {
    const {dataSelection} = useRecoilValue(ScorecardConfState)
    const {periods} = useRecoilValue(ScorecardViewSelector('periodSelection')) ?? []
    const {dataGroups} = dataSelection
    return (
        <DataTableHead>
            <DataTableRow>
                <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
                <DataTableCell align='center' fixed top={"0"} left={"50px"} width={"300px"} bordered className='scorecard-table-header scorecard-org-unit-cell'  rowSpan={"3"}>Organisation Unit</DataTableCell>
                {
                    dataGroups?.map(({title, id, dataHolders}) => (
                        <DataTableCell fixed className='scorecard-table-header' align='center' bordered
                                       colSpan={`${(dataHolders?.length ?? 1) * (periods?.length ?? 1)}`} key={id}>
                            {title}
                        </DataTableCell>
                    ))
                }
            </DataTableRow>
            <DataTableRow>
                <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
                {
                    dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id, dataSources}) => (
                        <DataTableCell fixed colSpan={`${periods?.length}`} bordered align='center'
                                       key={id}>{dataSources?.length > 1 ? `${dataSources[0]?.displayName}/${dataSources[1]?.displayName}` : dataSources[0]?.displayName}</DataTableCell>))))
                }
            </DataTableRow>
            <DataTableRow>
                <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
                {
                    dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id}) => (
                        periods?.map(({name, id: periodId}) => (
                            <DataTableCell width={"100px"} fixed className='scorecard-table-cell'  bordered align='center' key={`${id}-${periodId}`}>{name}</DataTableCell>))
                    ))))
                }
            </DataTableRow>
        </DataTableHead>
    )
}
