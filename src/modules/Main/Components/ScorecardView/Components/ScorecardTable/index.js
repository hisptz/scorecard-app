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
import TableHeader from "./Components/TableHeader";


export default function ScorecardTable(){

    return(
        <div className='w-100' >
            <DataTable>
                <TableHeader />
            </DataTable>
        </div>
    )
}
