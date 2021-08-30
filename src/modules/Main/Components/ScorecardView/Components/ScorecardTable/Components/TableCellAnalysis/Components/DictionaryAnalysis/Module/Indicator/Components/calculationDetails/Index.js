import {useDataQuery} from '@dhis2/app-runtime'
import {
    CircularLoader,
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import PropTypes from "prop-types";
import React, {useEffect} from 'react'
import CalculationDetailRow from './Components/Row'

const query = {
    calculation: {
        resource: "indicators",
        id: ({id}) => id,
        params: {
            fields: ["numerator", "denominator"]
        }
    }
}


export default function CalculationDetails({id}) {
    const {loading, error, data, refetch} = useDataQuery(query, {variables: {id}})

    useEffect(() => {
        refetch({id})
    }, [id])

    if (loading) {
        return <CircularLoader/>
    }

    if (error) {
        return <p> {error} </p>
    }

    const numDen = data.calculation


    return (<div>
        <h3> Calculation details</h3>
        <p> Below are expression computing numerator and denominator, and related sources </p>

        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        Expression
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        Formula
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        Sources
                    </DataTableColumnHeader>

                </DataTableRow>
            </TableHead>
            <TableBody>
                <DataTableRow>
                    <DataTableCell bordered>
                        Numerator
                    </DataTableCell>
                    <CalculationDetailRow formula={numDen.numerator} location="numerator"/>
                    {/*<CalculationDetailRow formula={"#{RF4VFVGdFRO.jOkIbJVhECg}"} location="numerator" />*/}

                </DataTableRow>
                <DataTableRow>
                    <DataTableCell bordered>
                        Denominator
                    </DataTableCell>

                    <CalculationDetailRow formula={numDen.denominator} location="denominator"/>

                </DataTableRow>

            </TableBody>

        </DataTable>

    </div>)
}


CalculationDetails.propTypes = {
    id: PropTypes.string.isRequired
}
