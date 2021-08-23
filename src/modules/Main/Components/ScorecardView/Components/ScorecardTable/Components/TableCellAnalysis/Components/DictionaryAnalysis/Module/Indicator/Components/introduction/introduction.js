import { CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { useEffect} from 'react'
import PropTypes from "prop-types";
import classes from './introduction.module.css'

   
const query = {

    indicatorsDetails:{
      resource:"indicators",
      id: ({id})=>id,
      params:{
        fields:["id","name","displayDescription","numeratorDescription","denominatorDescription",
        "indicatorType[displayName,id]",
        ]
      }
    }
  
  }

export default function Introduction({id}){

  const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])

  function onClickIdentified(){
    window.open(process.env.REACT_APP_API_LINK+"/api/indicators/"+id+".json");
   
  } 
    if(loading){
        return <CircularLoader />
     }

     if(error){
        return <p> {error} </p>
     }

     const indicatorDetails=data?.indicatorsDetails;
    //  console.log(indicatorDetails)  //having trouble getting indicator description
      
    return ( <div>
      
        <h2>{indicatorDetails?.name} </h2>

        <h3>Introduction</h3>

        <p>
        <b>{indicatorDetails?.name} </b>
         is a
         <b> {indicatorDetails?.indicatorType?.displayName} </b>
          indicator, measured by
        <b> {indicatorDetails?.numeratorDescription} </b>
         to  <b> {indicatorDetails?.denominatorDescription} </b>
         </p>


        <p>

Its described as {indicatorDetails?.displayDescription}
        </p>

        <p>
             <span ><i onClick={()=>onClickIdentified(indicatorDetails?.id)}> Identified by: <span className={classes.identifylink}> {indicatorDetails?.id} </span> </i></span>
        </p>


    </div>
    )


    
}


Introduction.prototype={
    id:PropTypes.string.isRequired
}