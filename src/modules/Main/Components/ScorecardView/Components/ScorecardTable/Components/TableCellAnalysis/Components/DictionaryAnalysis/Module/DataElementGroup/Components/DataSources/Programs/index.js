import {useDataQuery} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React, {useEffect} from 'react'
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import {programDataElementCountState} from "../../../../../Store";
import {useSetRecoilState} from "recoil";


const query = {
    programs: {
        resource: 'programStages',
        params: (({dataElementId})=>({
            fields: [
                'program[id,displayName]'
            ],
            filter: [
                `programStageDataElements.dataElement.id:eq:${dataElementId}`
            ]
        }))
    }
}


export default  function Programs({id,name}){
    const dataElementId=id

    const updateCount=useSetRecoilState(programDataElementCountState)

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {dataElementId}})

    useEffect(()=>{refetch({id})},[id])

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }

    //updating count its used in the facts component
    updateCount((prev)=>{return prev+data?.programs?.programStages?.length})


    return (<div>
        {name}
        <ul>
            {data?.programs?.programStages?.map((dt)=>{
                return <li key={dt?.program?.id}><b>{dt?.program?.displayName}</b> {i18n.t("submitting records on every event(case or individual)")} </li>
            })}
        </ul>




    </div>)

}

