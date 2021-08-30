import React from 'react'
import {useRecoilValue} from "recoil";
import {DataSourceState} from "../../state/data";
import TopBar from "./Module/TopBar";

export default function DictionaryAnalysis() {
    const dataSources = useRecoilValue(DataSourceState)

    const dataSourceArray=dataSources.map((dt)=>{
        return dt.id
    })




    return (
        <div className='column align-items-center center' style={{minHeight: 500}}><h3>Dictionary analysis</h3>
            <TopBar dataSources={dataSourceArray} />

        </div> //TODO: @james
    )
}


