import {
    DataTable,
    DataTableToolbar,
    DataTableHead,
    TableHead,
    DataTableBody,
    TableBody,
    DataTableFoot,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
} from '@dhis2/ui'

import classes from './table.module.css'


export default function Legend(props){

    const legendSet=props?.legendSet

 

    return (
        <li key={legendSet?.id}>
             <p>
                  {legendSet?.displayName} spread accross {legendSet?.legends?.length} classes of for analysis
          </p>

            <div>
                <DataTable  >

                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>
                                Class
                            </DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Upper
                            </DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Lower
                            </DataTableColumnHeader>
                            <DataTableColumnHeader >
                                Color
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>

                        {legendSet?.legends.map((legend)=>{
                            return <DataTableRow key={legend.id}>
                                <DataTableCell bordered>
                                    {legend?.displayName}
                                </DataTableCell >
                                <DataTableCell bordered>
                                    {legend?.endValue}
                                </DataTableCell>
                                <DataTableCell bordered>
                                    {legend?.startValue}
                                </DataTableCell>
                                <DataTableCell bordered >
                                    <div style={{
                                        background: legend?.color,
                                        width:"inherit",
                                        height:50
                                    }}>

                                    </div>
                                </DataTableCell>
                            </DataTableRow>

                        })}


                    </TableBody>

                </DataTable>
            </div>

        </li>
    );
}

