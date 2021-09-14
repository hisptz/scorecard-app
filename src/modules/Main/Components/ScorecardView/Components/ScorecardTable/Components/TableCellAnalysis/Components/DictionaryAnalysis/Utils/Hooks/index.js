import {useEffect,useState} from "react";
import { getFormulaSources, getWordDataForAll} from "../Functions/FormulaFunctions";
import {dataTypes, dataTypesInitials} from "../Models";
import React from "react";
import {getDataSetsArray, getNumDenMatch} from "../Functions/DataElementGroupSetFunctions";


export function useGetData(formula,engine,loc){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    useEffect(()=>{
       let tempArr =getFormulaSources(formula,dataTypesInitials.DATA_ELEMENT)
        let tempArr2=getFormulaSources(formula,dataTypesInitials.PROGRAM_INDICATOR)
        let tempArr3=getFormulaSources(formula,dataTypesInitials.DATASET_REPORTING_RATES)
        let tempArr4=getFormulaSources(formula,dataTypesInitials.ATTRIBUTES)
        let tempArr5=getFormulaSources(formula,dataTypesInitials.CONSTANTS)

        async function fetch(){
            tempArr= await getWordDataForAll(engine,tempArr,loc)
            tempArr2=await getWordDataForAll(engine,tempArr2,loc)
            tempArr3=await getWordDataForAll(engine,tempArr3,loc)
            tempArr4=await getWordDataForAll(engine,tempArr4,loc)
            tempArr5=await getWordDataForAll(engine,tempArr5,loc)

        }
        fetch().then(() =>  {
            let result={dataElements:tempArr,programIndicators:tempArr2,dataSetReportingRates:tempArr3,attributes:tempArr4,constants:tempArr5}

            setData(result)
            // setData((prevState => {return prevState.concat(result) }))
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
            setError(error)
        })
    },[])

    return{
        loading,
        error,
        data
    }

}

export function useGetDataSet(array,engine){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    //{"dataSetName:[dataElements in {id:"",displname:""}]}
    useEffect(()=>{
        let tempArr
        async function fetch(){
            tempArr = await getDataSetsArray(engine,array)
        }
        fetch().then(() =>  {

            let result={dataSets:tempArr}

            setData(result)
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
            setError(error)
        })
    },[])



    return{
        loading,
        error,
        data
    }
}

export function useGetNumDenMatch(array,engine){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()



    useEffect(()=>{
        let tempArr;
        async function fetch(){

            tempArr = await getNumDenMatch(engine,array)
        }
        fetch().then(() =>  {

            let result={matches:tempArr}
            setData(result)
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
            setError(error)
        })
    },[array?.length])



    return{
        loading,
        error,
        data
    }
}
