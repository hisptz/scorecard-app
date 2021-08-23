import {    DataTable,    TableHead,    TableBody,    DataTableRow,    DataTableColumnHeader} from '@dhis2/ui'
import Row from "./Row";
import {useRecoilValue} from "recoil";
import {programIndicatorStateDictionary} from "../../../../Store";

export default function ProgramIndicatorIndicator(){

    const programIndicators = useRecoilValue(programIndicatorStateDictionary)


    if(programIndicators.length===0){
        return (
            <div>
                <h3> Program Indicators in indicator </h3>
                <p>There were no Program Indicators in the Indicator Calculations</p>
            </div>
        )
    }



    let i=0

    return (<div>
        <h3> Program Indicators in indicator </h3>
        <p> The following is the summary of the program indicators used in calculations:</p>

        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        Program Indicator
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        Expression part
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Filter
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Aggregation type
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Analytics type
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Period boundaries
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Legends
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Groups
                    </DataTableColumnHeader>

                </DataTableRow>
            </TableHead>
            <TableBody>

                {programIndicators.map((programInd) => {
                    ++i
                    return <Row key={i} programInd={programInd}/>
                })}
            </TableBody>

        </DataTable>

    </div>)
}

