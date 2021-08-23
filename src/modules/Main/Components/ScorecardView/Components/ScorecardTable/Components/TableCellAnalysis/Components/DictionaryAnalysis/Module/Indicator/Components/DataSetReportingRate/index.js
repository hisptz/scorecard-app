
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
import {useRecoilValue} from "recoil";
import {dataSetReportingRatesStateDictionary} from "../../../../Store";
import Row from "./Row";


export default function DatasetsReportingRates(){

    const dataSetReportingRates = useRecoilValue(dataSetReportingRatesStateDictionary)

    if(dataSetReportingRates.length===0){
        return (
            <div>
                <h3> Datasets (Reporting rates) in indicator</h3>
                <p>There were no Datasets (Reporting rates) in the Indicator Calculations</p>
            </div>
        )
    }

    let i=0
    return <div>
        <h3>Datasets (Reporting rates) in indicator</h3>
        <p>The following is the summary of the datasets (reporting rates) used in calculations:</p>
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        Dataset
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        Description
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Timely Submission
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Expiry days
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Period type
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Assigned orgunits
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Data elements
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Legends
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>


                {dataSetReportingRates.map( (dataSet)=>{
                    ++i
                    return <Row key={i} dataSet={dataSet} />
                })}



            </TableBody>

        </DataTable>

    </div>
}

