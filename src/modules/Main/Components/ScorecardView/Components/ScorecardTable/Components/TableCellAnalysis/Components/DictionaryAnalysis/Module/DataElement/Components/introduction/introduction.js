
import {useDataQuery} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CircularLoader } from '@dhis2/ui'
import PropTypes from "prop-types";
import {useEffect} from 'react'

const query = {
    dataElements:{
        resource:"dataElements",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","description","shortName","code",
                "displayFormName","href"
            ]
        }
    }

}


export default function Introduction({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])

    if(loading){
        return <CircularLoader />
    }

    if(error){
        return <p> {error} </p>
    }



    const res=data?.dataElements


    return ( <div>

        <h3> {i18n.t("Introduction")} </h3>

            <p>
               <b>{res?.displayName}</b> {i18n.t("can be described as {{variables}}.",{variables:res?.description})}
                <br/>
            {i18n.t("It’s labelled in short as {{variables1}} and has a code of {{variables2}}. In data entry form, it’s named “{{variables3}}”",{variables1:res?.shortName,variables2:res?.code,variables3:res?.displayFormName})}
                <br/>
            {i18n.t("Identified by:")}  <i> <a style={{textDecoration:"none"}} href={res?.href +".json"} target={"_blank"} rel="noreferrer" >{res?.id}</a> </i>
            </p>

    </div>
    )

}



Introduction.prototype={
    id:PropTypes.string.isRequired
}