import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";

export default function HeaderRow({column, colSpan}) {
    const {value, displayNameProperty} = column;

    return (
        <DataTableRow>
            {
                value?.map(col => (
                    <DataTableCell key={`${col[displayNameProperty]}-col1`} colSpan={colSpan}>
                        {col[displayNameProperty]}
                    </DataTableCell>
                ))
            }
        </DataTableRow>
    )
}


HeaderRow.propTypes = {
    colSpan: PropTypes.number.isRequired,
    column: PropTypes.object.isRequired,
};
