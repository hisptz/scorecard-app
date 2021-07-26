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
import {ScorecardDataState} from "../../../../../../core/state/scorecard";
import TableHeader from "./Components/TableHeader";


export default function ScorecardTable(){
    const scorecardData = useRecoilValue(ScorecardDataState)

    return(
        <div className='w-100' >
            <DataTable>
                <TableHeader />
            </DataTable>
        </div>
    )
}
