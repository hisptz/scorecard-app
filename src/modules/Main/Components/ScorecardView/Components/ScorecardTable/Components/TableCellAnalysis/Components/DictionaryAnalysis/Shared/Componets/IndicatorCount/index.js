import React from "react";
import {useDataEngine} from "@dhis2/app-runtime";
import {useGetNumDenMatch} from "../../../Utils/Hooks";
import Loader from "../Loaders/Loader";
import Error from "../Error/ErrorAPIResult";
import i18n from '@dhis2/d2-i18n'



export default function IndicatorCount({dataElementsArray}){

    const engine=useDataEngine()

    const onlyIds=dataElementsArray.map((e)=>{
        return e?.id
    })


    const {loading, error, data}=useGetNumDenMatch(onlyIds,engine)

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }



    let count=0
    data.matches?.map((e)=>{
       count+= e.numeratorMatch?.indicators?.length+e?.denominatorMatch?.indicators?.length
    })


    return <>{
            i18n.t("It’s data elements belongs to {{variables}} indicators using it as numerator/denominator",
                    {variables:count}
            ) }
            </>

}

