import {useEffect, useState} from "react";
import {    getProgramFromAttributesOrDtElPrg,    getProgramFromProgramIndicator} from "../../Functions/IndicatorDataSourceFunction";


export function useGetIndicatorProgramSource(obj,engine){  //obj strcture is { attr: [], prgInd: [] , prgDtEl: [] }

    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    //{"dataSetName:[dataElements in {id:"",displname:""}]}
    useEffect(()=>{
        let attrArr=obj?.attr;
        let proDtElArr=obj?.prgDtEl
        let prgIndArr=obj?.prgInd

        async function fetch(){
            attrArr = await getProgramFromAttributesOrDtElPrg(engine,attrArr)
            proDtElArr = await getProgramFromAttributesOrDtElPrg(engine,proDtElArr)
            prgIndArr=await getProgramFromProgramIndicator(engine,prgIndArr)

        }
        fetch().then(() =>  {

            let result={attr:attrArr,prgInd:prgIndArr,prgDtEl:proDtElArr}

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
