import i18n from '@dhis2/d2-i18n'
import { TableHead, TableBody,  DataTable,    DataTableRow,    DataTableCell,    DataTableColumnHeader,} from '@dhis2/ui'
import PropTypes from "prop-types";
import React from "react";
import DisplayFormula from "../../../../../Shared/Componets/DisplayFormula/Index";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import {dataTypes} from "../../../../../Utils/Models";



export default function ExpressionDetailTable({expression,filter}){

    
    return   <DataTable>
        <TableHead>
            <DataTableRow>
                <DataTableColumnHeader>

                </DataTableColumnHeader>
                <DataTableColumnHeader>
                    {i18n.t("Expression")}

                </DataTableColumnHeader>
                <DataTableColumnHeader>
                       {i18n.t("Filter")}
                </DataTableColumnHeader>

            </DataTableRow>
        </TableHead>
        <TableBody>
            <DataTableRow>
                <DataTableCell bordered tag="th">
                        {i18n.t("Details")}
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

ExpressionDetailTable.propTypes = {
    expression: PropTypes.string.isRequired,
    filter:PropTypes.string.isRequired
};

