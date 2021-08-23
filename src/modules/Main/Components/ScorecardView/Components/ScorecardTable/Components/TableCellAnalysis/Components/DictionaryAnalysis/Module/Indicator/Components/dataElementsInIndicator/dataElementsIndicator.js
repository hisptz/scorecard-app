import {useContext} from "react";
import {
    DataTable,
    DataTableToolbar,
    DataTableHead,
    TableHead,
    DataTableBody,
    TableBody,
    DataTableFoot,
    DataTableRow,
    DataTableColumnHeader,
} from '@dhis2/ui'

import Row from './row'

import {selector, useRecoilValue} from "recoil";
import {dataElementsStateDictionary} from "../../../../Store";

export default function DataElementSIndicator() {

    const dataElements = useRecoilValue(dataElementsStateDictionary)

    if(dataElements.length===0){
        return (
            <div>
                <h3> Data elements in indicator </h3>
                <p>There were no Data Elements in the Indicator Calculations</p>
            </div>
        )
    }

    let i = 0
    return (<div>
        <h3> Data elements in indicator </h3>
        <p> The following is the summary of the data elements used in calculations:</p>

        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        Data Element
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        Expression part (Numerator/ Denominator)
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Value Type
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Zero Significance
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Categories
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Datasets/ Programs
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Groups
                    </DataTableColumnHeader>

                </DataTableRow>
            </TableHead>
            <TableBody>
                {dataElements.map((dtEle) => {
                    i++
                    return <Row key={i} datEl={dtEle}/>
                })}
            </TableBody>

        </DataTable>


    </div>)
}


