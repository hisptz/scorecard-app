import {   DataTableRow,    DataTableCell} from '@dhis2/ui'

import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from "prop-types";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import {isPureDataElement} from "../../../../../Utils/Functions/FormulaFunctions";
import RowTracker from "./RowTracker";


   
const query = {
    dataElementInIndicator:{
      resource:"dataElements",
        id: ({id})=>id,
        params:{
          fields:["id","displayName","valueType","zeroIsSignificant","dataSetElements[dataSet[id,displayName]]","dataElementGroups[id,displayName]","categoryCombo[categories[id,displayName]]"]
        }
    
    }
  }


export default  function RowAggregate({id,location}){



    let data;
    if(isPureDataElement(id)){
        data= getData(id).dataElementInIndicator
    }else{
        let arr= id.split(".")
        data=getData(arr[0]).dataElementInIndicator
    }



    function getData(id){
        const {loading, error, data} = useDataQuery(query, {variables: {id}})
        if(loading){
            return <Loader />
         }
         if(error){
            return <Error error={""} />
         }  
         return data
    }

    return <DataTableRow >
             <DataTableCell bordered>
                 {data?.displayName}
                </DataTableCell  >
                <DataTableCell bordered>
                {location}
                </DataTableCell>
            <DataTableCell bordered>

                {data?.valueType}
            </DataTableCell>


            <DataTableCell bordered>

                {JSON.stringify(data?.zeroIsSignificant)}
            </DataTableCell>
            <DataTableCell bordered>
                <ol>
                    {data?.categoryCombo?.categories.map((cat)=>{return <li key={cat?.id}>{cat?.displayName}</li>})}
                </ol>
            </DataTableCell>
            <DataTableCell bordered>
                <ol>
                    { data?.dataSetElements?.map((dataSet)=>{return <li key={dataSet?.dataSet?.id}>{dataSet?.dataSet?.displayName}</li>})}
                </ol>
            </DataTableCell>
            <DataTableCell bordered>
                <ol>
                    { data?.dataElementGroups?.map((group)=>{return <li key={group?.id}>{group?.displayName}</li>})}
                </ol>
            </DataTableCell>
            </DataTableRow>
}



RowAggregate.propTypes={
    id:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired

}
