import {useDataEngine} from '@dhis2/app-runtime'
import React, {useEffect, useState} from "react";
import {  getDetailedValueFromApi,    getFinalWordFormula,    getFormulaSources} from "../../../../../Utils/Functions/FormulaFunctions";
import {dataTypes} from "../../../../../Utils/Models";
import PropTypes from "prop-types";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";

export default function DisplayFormula(props){
    //props
    const formula=props.formula
    const loc=props.location

    //variables
    let wordDtEl=[]
    let programInd=[]
    let dataSetReportingRates=[]

    //hooks
    const[dataElementsArray,setDataElementArray]=useState([])
    const[programIndicatorArray,setProgramIndicatorArray]=useState([])
    const[dataSetReportingRatesArray,setDataSetReportingRatesArray]=useState([])
    const [loading,setLoading]=useState()
    const [error,setError]=useState()

    const engine = useDataEngine()


    useEffect(()=>{
        let tempArr=getFormulaSources(formula,"#{")
        if(tempArr.length){
           async function fetch(){
               wordDtEl= await getWordData(tempArr,dataTypes.DATA_ELEMENT)
            }
            setLoading(true)
            setError(false)
            fetch().then(() =>  {
                setDataElementArray(wordDtEl)
                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
                setError(error)
            })

        }

    },[])
    useEffect(()=>{
        let tempArr=getFormulaSources(formula,"I{")
        if(tempArr.length){
            async function fetch(){
              programInd= await getWordData(tempArr,dataTypes.PROGRAM_INDICATOR)
            }
            setLoading(true)
            setError(false)
            fetch().then(() =>  {
                setProgramIndicatorArray(programInd)
                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
                setError(error)
            })
        }

    },[])
    useEffect(()=>{
        let tempArr=getFormulaSources(formula,"R{")
        if(tempArr.length){
            async function fetch(){
               dataSetReportingRates= await getWordData(tempArr,dataTypes.DATASET_REPORTING_RATES)
            }
            setLoading(true)
            setError(false)
            fetch().then(() =>  {
                setDataSetReportingRatesArray(dataSetReportingRates)

                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
                setError(error)
            })

        }
    },[])

    //functions
    async function getWordData(arr,type){ //arr for array of id of datas to get their values, type indicates the data type of data eg dataElement=0 program indicator=1, reporting rates=2
        let allPromises= arr.map((id)=>{
            return getDetailedValueFromApi(engine,id,type)
        })

       return await Promise.all(allPromises).then(value => {
            if(type===dataTypes.DATA_ELEMENT){
               return  value.map((val,index)=>{ //We always return array just for uniformity
                    if(val.length===2){ //array of two elements first element is dataElement second element of array is category option combo
                        return {id:arr[index],val:val[0].displayName+" "+val[1],location:loc,sources:val[0].dataSetElements}
                        // wordDtEl.push({id:arr[i],val:val[0].displayName+" "+val[1],location:loc,sources:val[0].dataSetElements})
                    }if(val.length===1){   //this is array of one element for data element that are just pure no category options
                        return {id:arr[index],val:val[0].displayName,"location":loc,sources:val[0].dataSetElements}
                        // wordDtEl.push({id:arr[i],val:val[0].displayName,"location":loc,sources:val[0].dataSetElements})
                    }

                })
            }
            if(type===dataTypes.PROGRAM_INDICATOR){
               return  value.map((val,index)=>{ //We always return array just for uniformity
                   return {"id":arr[index],"val":val[0].displayName,"location":loc,sources:val[0].program}
                })
            }
            if(type===dataTypes.DATASET_REPORTING_RATES){
               return  value.map((val,index)=>{ //We always return array just for uniformity
                    return {"id":arr[index],"val":val[0],"location":loc}
                })
            }

        })
    }

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }
    return <div>

        {getFinalWordFormula(formula,dataElementsArray,programIndicatorArray,dataSetReportingRatesArray,[],[])}

    </div>
}

DisplayFormula.prototype={
    formula:PropTypes.string.isRequired,

}