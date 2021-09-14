import {useDataQuery} from "@dhis2/app-runtime";
import {useEffect} from "react";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import React from 'react'
import _ from 'lodash'
import {dataElementDomainTypes} from "../../../../Utils/Models";
import DataSets from "./DataSets";
import Programs from "./Programs";
import i18n from '@dhis2/d2-i18n'


const query = {
    sources:{
        resource:"dataElementGroups",
        id: ({id})=>id,
        params:{
            fields:["dataElements[id,displayName,domainType]"]
        }
    }
}


export default function DataSources({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])


    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }

    let traker= _.filter(data?.sources?.dataElements,(el)=>{return el?.domainType===dataElementDomainTypes.TRACKER})
    let aggregate=_.filter(data?.sources?.dataElements,(el)=>{return el?.domainType===dataElementDomainTypes.AGGREGATE})

    return <div>
        <h3>{i18n.t("Data sources (Datasets/Programs)")} </h3>
        <p> {i18n.t("Data elements in this group are captured from the following sources")}    </p>

            {data?.sources?.dataElements?.length===0?i18n.t("There are no Data Elements in this Data Element group"):""}

            {aggregate?.length>0? <h4>{i18n.t("For Aggregate Data Elements:")} </h4>:""}
            {aggregate?.length>0?
                <DataSets aggregate={aggregate} />:""

            }

            {traker?.length>0?<h4>{i18n.t("For Tracker Data Elements:")} </h4>:""}
            {traker?.length>0?
                traker.map((el)=>{
                    return <Programs id={el?.id} name={el?.displayName} />
                }):""
            }



    </div>
}