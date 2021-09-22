import {useEffect, useState} from "react";

import {getAllFunctions, getFunctionDetails, getIdDetails} from "../../Functions/FunctionDictionary";


export function useGetFunctionsDetails(engine,array){

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    useEffect(()=>{

        async function fetch(){
            return  await getFunctionDetails(engine,array)
        }

        fetch().then((val) =>  {

            setData(val)
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

export function useGetIdDetails(array,engine){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    useEffect(()=>{
        let tmp;
        async function fetch(){
            tmp= await getIdDetails(engine,array)

        }
        fetch().then(() =>  {
            let result={idDetails:tmp}
            setData(result)
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
            setError(error)
        })
    },[JSON.stringify(array)])

    return{
        loading,
        error,
        data
    }
}


export function useGetAllFunctionsId(engine){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    useEffect(()=>{
        async function fetch(){
            return getAllFunctions(engine);
        }
        fetch().then((value => {
            setLoading(false)
            setData(value)
        })).catch((error)=>{
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
