
import { CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect} from 'react'
import Introduction from "../introduction/introduction";
import PropTypes from "prop-types";
import OtherDetailTable from "./Components/OtherDetails";

const query = {
    sources:{
      resource:"dataElements",
        //   id: "Uvn6LCg7dVU",
          id: ({id})=>id,
        params:{
          fields:["id","displayName","dataSetElements[dataSet[id,displayName,periodType,timelyDays]]"]
        }
    } 
  }

export default  function DataSource({id}){


        const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

        useEffect(()=>{refetch({id})},[id])


        // if(loading){
       //    return <CircularLoader />
       // }
       //
       // if(error){
       //    return <p> {error} </p>
       // }
       //

        return (<div>
           <h3>Data sources </h3>
           <p>
               Data element is captured from following sources
               {/*{{routineDataSource(if-applicable)}} and {{eventBased_i.e._case_or_individual(if-applicable)}}*/}
               {/*with */}


           </p>
            <h5>Datasets</h5>
               
            {/*<ul>*/}
            {/*{data.sources.dataSets.map((dataSet)=>{*/}
            {/*    return <li key={dataSet.id}><b>{dataSet.displayName}</b> submitting {dataSet.periodType} after every {dataSet.timelyDays} days</li>*/}
            {/*})}*/}
            {/*</ul>*/}
            
            <h5>Programs</h5>

            <OtherDetailTable />
        </div>)

    }




DataSource.prototype={
    id:PropTypes.string.isRequired
}