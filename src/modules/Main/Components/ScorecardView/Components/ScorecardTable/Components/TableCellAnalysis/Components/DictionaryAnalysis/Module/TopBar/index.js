
import {useEffect, useState} from "react";
import {Chip} from '@dhis2/ui'

import React from 'react'

import {useDataEngine} from "@dhis2/app-runtime";
import IdentifiableObjectDataSource, {displayNameLength, getDataSourceType} from "../../Utils/Functions/FormulaTopBar";
import DataSourceSelector from "./Components/DataSourceSelector";

export default function TopBar(props){

    //variables
    const[dataSourceValues,setDataSourcesValues]=useState([]);

    const[selectedDataSource,setSelectedDataSource]=useState(0)

    const arrayDataSource=props.dataSources;  //these are arrays of ids

    let loading

    //hooks
    const engine=useDataEngine()
    useEffect(()=>{
        getDataSourceValues(arrayDataSource)
    },[])

    //functions

   function getDataSourceValues(arrayDataSource){
        let promisArr= IdentifiableObjectDataSource(engine,arrayDataSource)
         Promise.all(promisArr).then(value => {
            // setDataSourcesValues(value)
             let temp=[]
             let i=0
            value.map((obj=>{
                temp.push({id:obj[0].id,type:getDataSourceType(obj[0].href),displayName:obj[0].displayName,index:i})
                ++i
            }))
             setDataSourcesValues((prevState) =>{
                 return prevState.concat(temp)
             })
        })
        loading=false
    }

    return <div>
        {dataSourceValues?.map((dt)=>{
            return <Chip onClick={()=>setSelectedDataSource(dt.index)} key={dt.id} >{displayNameLength(dt.displayName)}</Chip>
        })}

        {dataSourceValues.length>0? <DataSourceSelector type={dataSourceValues[selectedDataSource]?.type} id={dataSourceValues[selectedDataSource]?.id} /> :""}

    </div>


}