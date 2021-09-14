
import {useDataEngine, useDataQuery} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React,{useEffect} from 'react'
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import {useGetDataSet} from "../../../../../Utils/Hooks";
import {useSetRecoilState} from "recoil";
import _ from "lodash";
import {indicatorGroupAggregateDataElements, indicatorGroupDataSets} from "../../../../../Store/IndicatorGroup";


export default  function DataSets({aggregate}){


    const updateDataSets=useSetRecoilState(indicatorGroupDataSets)

    const updateDataElements=useSetRecoilState(indicatorGroupAggregateDataElements)

   const dt= aggregate.map((e)=>{
        return (e.split(".")[0])

    })


    updateDataElements((prev)=>{return _.concat(prev,dt)})

    const engine=useDataEngine()

    let onlyIds=aggregate.map((el)=>{
        return el?.split(".")[0] //since id may come as with . to indicate with category comb
    })

    const {loading,error,data}=useGetDataSet(onlyIds,engine)

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }



   let allDataSets=[];
    data?.dataSets?.map((e)=>{
        e.map((el)=>{
            allDataSets.push(el)
        })
    })

    allDataSets=_.uniqWith(allDataSets,_.isEqual)


    // update for Count its used in the facts components
    updateDataSets( (prev)=>{return  _.concat(prev,allDataSets)} )


    return (<div>
        {i18n.t("Datasets")}
        <ul>
            {allDataSets?.map((datset)=>{
                return <li key={datset?.id}>{datset?.displayName} {i18n.t(" submitting ")}  {datset?.periodType} {i18n.t(" after every ")} {datset?.timelyDays} {i18n.t(" days")}  </li>
            })}
       </ul>



    </div>)

}

DataSets.propTypes={
    id:PropTypes.string.isRequired
}