import {
    DataTable,    DataTableToolbar,    DataTableHead,    TableHead,    DataTableBody,    TableBody,    DataTableFoot,    DataTableRow,    DataTableCell,    DataTableColumnHeader,
} from '@dhis2/ui'
import { CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import CalculationDetailRow from './Components/Row'
import { useEffect} from 'react'
import Introduction from "../introduction/introduction";
import PropTypes from "prop-types";

const query = {
    calculation:{
      resource:"indicators",
       id: ({id})=>id,
        params:{
          fields:["numerator","denominator"]
        }
    }
  }


export default function CalculationDetails({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])

if(loading){
    return <CircularLoader />
 }

 if(error){
    return <p> {error} </p> 
 }  

 const numDen=data.calculation


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
            </DataTableCell  >
            <CalculationDetailRow formula={numDen.numerator} location="numerator" />
            {/*<CalculationDetailRow formula={"#{RF4VFVGdFRO.jOkIbJVhECg}"} location="numerator" />*/}

        </DataTableRow>
        <DataTableRow>
            <DataTableCell bordered >
               Denominator
            </DataTableCell>

            <CalculationDetailRow formula={numDen.denominator} location="denominator" />
           
        </DataTableRow>
        
    </TableBody>
    
</DataTable>  

    </div>)
}


CalculationDetails.prototype={
    id:PropTypes.string.isRequired
}