import {
    DataTable,
    DataTableToolbar,
    DataTableHead,
    DataTableBody,
    DataTableFoot,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
} from '@dhis2/ui'
import React from 'react'
import {useRecoilValue} from "recoil";
import ScorecardConfState from "../../../../../../../core/state/scorecard";

export default function TableHeader(){
    const {dataSelection} = useRecoilValue(ScorecardConfState)
    console.log(dataSelection)

    return(
            <DataTableHead>
                <DataTableColumnHeader>Organisation Unit</DataTableColumnHeader>
                {
                    dataSelection?.dataGroups?.map(({title, id})=>(<DataTableColumnHeader key={`${id}-scorecard-table`} >{title}</DataTableColumnHeader>))
                }
            </DataTableHead>
    )
}
