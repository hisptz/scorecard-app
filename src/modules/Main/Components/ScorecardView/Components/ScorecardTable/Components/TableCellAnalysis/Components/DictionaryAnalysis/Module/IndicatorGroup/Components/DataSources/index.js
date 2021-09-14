import {useDataQuery} from "@dhis2/app-runtime";
import {useEffect} from "react";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import React from 'react'
import _ from 'lodash'
import {dataElementDomainTypes, dataTypesInitials} from "../../../../Utils/Models";
import DataSets from "./DataSets";
import Programs from "./Programs";
import i18n from '@dhis2/d2-i18n'
import {getFormulaSources} from "../../../../Utils/Functions/FormulaFunctions";
import {useSetRecoilState} from "recoil";
import {
    indicatorGroupDenominatorDataElements,
    indicatorGroupNumeratorDataElements
} from "../../../../Store/IndicatorGroup";


const query = {
    sources:{
        resource:"indicatorGroups",
        id: ({id})=>id,
        params:{
            fields:["indicators[id,displayName,numerator,denominator]"]
        }
    }
}


export default function DataSources({id}){

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {id}})

    useEffect(()=>{refetch({id})},[id])

    const updateNum=useSetRecoilState(indicatorGroupNumeratorDataElements)
    const updateDen=useSetRecoilState(indicatorGroupDenominatorDataElements)


    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }


    let numerator1;
    let denominator1;
    let numerator2;
    let denominator2;


    //for each indicator, put dataElements from both numerator and den in one array them pass in it
    const sourcesDataElement=data?.sources?.indicators?.map((e)=>{
         numerator1=getFormulaSources(e?.numerator,dataTypesInitials.DATA_ELEMENT)
         denominator1=getFormulaSources(e?.denominator,dataTypesInitials.DATA_ELEMENT)

        return _.concat([],numerator1,denominator1)
    })

    const sourceProgram=data?.sources?.indicators?.map((e)=>{
        numerator2=getFormulaSources(e?.numerator,dataTypesInitials.PROGRAM_DATA_ELEMENT)
        denominator2=getFormulaSources(e?.denominator,dataTypesInitials.PROGRAM_DATA_ELEMENT)
        let ind= _.concat([],getFormulaSources(e?.numerator,dataTypesInitials.PROGRAM_INDICATOR),getFormulaSources(e?.denominator,dataTypesInitials.PROGRAM_INDICATOR) )
        let attr= _.concat([],getFormulaSources(e?.numerator,dataTypesInitials.ATTRIBUTES),getFormulaSources(e?.denominator,dataTypesInitials.ATTRIBUTES) )
        let prgDtEl= _.concat([],numerator2,denominator2 )
        return {prgInd:ind,attr:attr,prgDtEl:prgDtEl}

    })

    //for related indicator
    updateNum({aggregate:numerator1,tracker:numerator2})
    updateDen({aggregate:denominator1,tracker:denominator2})

    return <div>
        <h3>{i18n.t("Data sources (Datasets/Programs)")} </h3>
        <p> {i18n.t("Indicators in this group are captured from the following sources")}    </p>

        <ul>
            {data?.sources?.indicators?.map((e,index)=>{
                return <li><b> {e?.displayName} </b>

                    <DataSets aggregate={sourcesDataElement[index]} />
                    <Programs sources={sourceProgram[index]} />
                </li>
            })}
        </ul>


    </div>
}