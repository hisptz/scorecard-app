import React, {useEffect} from 'react'
import {useDataQuery} from "@dhis2/app-runtime";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import {dataSetDataElementCountState, programDataElementCountState} from "../../../../Store";
import {useRecoilValue} from "recoil";
import IndicatorCount from "../../../../Shared/Componets/IndicatorCount";
import i18n from '@dhis2/d2-i18n'

const query = {
    sources:{
        resource:"dataElementGroups",
        id: ({id})=>id,
        params:{
            fields:["dataElements"]
        }
    },

}


export default function Facts({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    const dataSetCount=useRecoilValue(dataSetDataElementCountState)
    const programCount=useRecoilValue(programDataElementCountState)

    useEffect(()=>{refetch({id})},[id])

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }


    return <div>
        <h3>
            {i18n.t(" Data element group Facts")}
        </h3>

        <ul>
            <li> {i18n.t("It has {{variables}} data Elements",
                            {
                                variables:data?.sources?.dataElements?.length
                            }
                        )
                }
            </li>
            <li> {i18n.t("It’s data elements belongs to {{variables}} dataset and {{variables2}} program sources of data",
                        {
                            variables:dataSetCount,
                            variables2:programCount
                        }
                    )}
            </li>
            <li>
                <IndicatorCount dataElementsArray={data?.sources?.dataElements}/> </li>
        </ul>
    </div>
}