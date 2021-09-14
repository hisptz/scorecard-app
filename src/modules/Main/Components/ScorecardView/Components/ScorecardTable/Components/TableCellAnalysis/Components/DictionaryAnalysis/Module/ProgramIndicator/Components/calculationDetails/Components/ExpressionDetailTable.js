import {dataTypes} from "../../../../../Utils/Models";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import React from "react";
import { TableHead, TableBody,  DataTable,    DataTableRow,    DataTableCell,    DataTableColumnHeader,} from '@dhis2/ui'
import DisplayFormula from "../../../../../Shared/Componets/DisplayFormula/Index";



export default function ExpressionDetailTable(props){
    const expression=props.expression;
    const filter=props.filter



    return   <DataTable>
        <TableHead>
            <DataTableRow>
                <DataTableColumnHeader>

                </DataTableColumnHeader>
                <DataTableColumnHeader>
                    Expression
                </DataTableColumnHeader>
                <DataTableColumnHeader>
                    Filter
                </DataTableColumnHeader>

            </DataTableRow>
        </TableHead>
        <TableBody>
            <DataTableRow>
                <DataTableCell bordered tag="th">
                    Details
                </DataTableCell>
                <DataTableCell bordered >
                    <DisplayFormula formula={expression} />


                </DataTableCell>
                <DataTableCell bordered>

                    <DisplayFormula formula={filter} />
                </DataTableCell>


            </DataTableRow>
        </TableBody>
    </DataTable>
}