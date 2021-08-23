import { TableHead, TableBody,  DataTable,    DataTableRow,    DataTableCell,    DataTableColumnHeader,} from '@dhis2/ui'

export default function OtherDetailTable(props){

    const src=props?.res

    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>

                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Color
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Icon
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Option set
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Option set for Comments
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Legends
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Aggregation Levels
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                <DataTableRow>
                    <DataTableCell bordered tag="th">
                        Details
                    </DataTableCell>
                    <DataTableCell bordered>
                        Color
                    </DataTableCell>
                    <DataTableCell bordered>
                        Icon
                    </DataTableCell>
                    <DataTableCell bordered>
                        Option set
                    </DataTableCell>
                    <DataTableCell bordered>
                        Option set for Comments
                    </DataTableCell>
                    <DataTableCell bordered>
                        Legends
                    </DataTableCell>
                    <DataTableCell bordered>
                        Aggregation Levels
                    </DataTableCell>

                </DataTableRow>
            </TableBody>
        </DataTable>
    )
}