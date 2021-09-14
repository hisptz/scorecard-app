import {useState,useEffect} from "react";
import {dataSourceTypes} from "../../Models";
import {isEmpty} from "lodash";

const query={
    matches:{
        resource: 'dataElements',
        params: ({keyword}) => ({
            fields: [
                'id','displayName',"href"
            ],
            pageSize:10,
            filter:[`id:like:${keyword}`,`displayName:like:${keyword}`],
            rootJunction:"OR"
        })
    },
}

const query2={
    matches:{
        resource: 'indicators',
        params: ({keyword}) => ({
            fields: [
                'id','displayName',"href"
            ],
            pageSize:10,
            filter:[`id:like:${keyword}`,`displayName:like:${keyword}`],
            rootJunction:"OR"
        })
    },
}

const query3={
    matches:{
        resource: 'programIndicators',
        params: ({keyword}) => ({
            fields: [
                'id','displayName',"href"
            ],
            pageSize:10,
            filter:[`id:like:${keyword}`,`displayName:like:${keyword}`],
            rootJunction:"OR"
        })
    },
}

const query4={
    matches:{
        resource: 'dataElementGroups',
        params: ({keyword}) => ({
            fields: [
                'id','displayName',"href"
            ],
            pageSize:10,
            filter:[`id:like:${keyword}`,`displayName:like:${keyword}`],
            rootJunction:"OR"
        })
    },
}

const query5={
    matches:{
        resource: 'indicatorGroups',
        params: ({keyword}) => ({
            fields: [
                'id','displayName',"href"
            ],
            pageSize:10,
            filter:[`id:like:${keyword}`,`displayName:like:${keyword}`],
            rootJunction:"OR"
        })
    },
}



export function useGetSearchResult(keyword,type,engine){
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [data,setData]=useState()

    let result=[]
    useEffect( () => {
        async function fetch ()
        {
            if(keyword!==""){
                return await getResult(keyword, engine, type);
            }

        }
        fetch().then((res)=>{
            setLoading(false)
            setData(res)

        }).catch((error)=>{
            setLoading(false)
            setError(error)
        })


    },[keyword,type])
    return{
        loading,
        error,
        data
    }

 }


 async function getResult(keyword, engine, type) {

     if (type === dataSourceTypes.DATA_ELEMENT) {
         const data = await engine.query(query, {variables: {keyword}})
         return data.matches.dataElements
     }
     if(type===dataSourceTypes.INDICATOR){
         const data = await engine.query(query2, {variables: {keyword}})
         return data.matches.indicators
     }
     if (type===dataSourceTypes.PROGRAM_INDICATOR){
         const data = await engine.query(query3, {variables: {keyword}})
         return data.matches.programIndicators
     }
     if(type===dataSourceTypes.DATA_ELEMENT_GROUP){
         const data = await engine.query(query4, {variables: {keyword}})
         return data.matches.dataElementGroups
     }
     if(type===dataSourceTypes.INDICATOR_GROUP){
         const data = await engine.query(query5, {variables: {keyword}})
         return data.matches.indicatorGroups
     }
     // if(type===dataSourceTypes.FUNCTION){
     //     const data = await engine.query(query6, {variables: {keyword}})
     // }

 }



