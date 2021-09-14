
import PropTypes from "prop-types";
import {useDataQuery} from "@dhis2/app-runtime";
import React, {useEffect} from 'react'
import { CircularLoader } from '@dhis2/ui'
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import IdentifiedBy from "../../../../Shared/Componets/IdentifiedBy/Index";
import i18n from '@dhis2/d2-i18n'

const query = {
    programIndicators:{
        resource:"programIndicators",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","displayDescription","aggregationType","displayShortName","code","decimals","displayInForm","href"
            ]
        }
    }
}

export default function Introduction({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }



    let res=data?.programIndicators


    return ( <div>

        <h3>{i18n.t("Introduction")} </h3>

            <p>

                {i18n.t("{{variables1}} is a {{variables2}} indicator, described as {{variables3}}. It’s labelled in short as {{variables4}} and has a code of {{variables5}}. In analytics it displays up to {{variables6}} decimals." ,
                    {
                        variables1:res?.displayName,
                        variables2:res?.aggregationType,
                        variables3:res?.displayDescription,
                        variables4:res?.displayShortName,
                        variables5:res?.code,
                        variables6:res?.decimals
                    }
                    )}
                {res?.displayInForm? i18n.t("It is also set to display in form"):""}


            </p>
            <IdentifiedBy href={res?.href} id={res?.id} />

    </div>
    )

}



Introduction.PropTypes={
    id:PropTypes.string.isRequired
}