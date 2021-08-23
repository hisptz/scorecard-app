
import { CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect} from 'react'
import Introduction from "../introduction/introduction";
import PropTypes from "prop-types";

const query = {
    sources:{
      resource:"indicators",
        //   id: "Uvn6LCg7dVU",
          id: ({id})=>id,
        params:{
          fields:["id","displayName","dataSets[id,displayName,timelyDays,periodType]"]
        }
    } 
  }

export default  function DataSource({id}){


        const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

        useEffect(()=>{refetch({id})},[id])


        if(loading){
          return <CircularLoader />
       }
      
       if(error){
          return <p> {error} </p> 
       }  

       if(data?.sources?.dataSets.length===0){
           return <div></div>
       }

        return (<div>

           <h3>Data sources (Datasets/Programs)</h3> 
           <p>  
                Indicator is captured from the following sources  
                {/* issues of applicable routine dataSources */}
            </p>
            <h5>Datasets</h5>
               
            <ul>
            {data?.sources?.dataSets.map((dataSet)=>{
                return <li key={dataSet?.id}><b>{dataSet?.displayName}</b> submitting {dataSet?.periodType} after every {dataSet?.timelyDays} days</li>
            })}
            </ul>
            
            {/*<h5>Programs</h5>*/}

        </div>)

    }




DataSource.prototype={
    id:PropTypes.string.isRequired
}