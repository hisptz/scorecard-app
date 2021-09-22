
import i18n from "@dhis2/d2-i18n";
import React from 'react'
import {
    DataTable,
    DataTableToolbar,
    DataTableHead,
    TableHead,
    DataTableBody,
    TableBody,
    DataTableCell,
    DataTableRow,
    DataTableColumnHeader,
} from '@dhis2/ui'

export default function ApiEndPoint({selected}){



    return <div>
        <h3>API Endpoints used as the data source</h3>

        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        {i18n.t("Endpoint")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        {i18n.t("Appearances")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Suggesting Factor")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Documentation")}
                    </DataTableColumnHeader>


                </DataTableRow>
            </TableHead>
            <TableBody>
                <DataTableRow >
                    <DataTableCell bordered>

                    </DataTableCell  >
                    <DataTableCell bordered>

                    </DataTableCell  >
                    <DataTableCell bordered>

                    </DataTableCell  >
                    <DataTableCell bordered>

                    </DataTableCell  >
                    

                </DataTableRow>
            </TableBody>

        </DataTable>

    </div>
}