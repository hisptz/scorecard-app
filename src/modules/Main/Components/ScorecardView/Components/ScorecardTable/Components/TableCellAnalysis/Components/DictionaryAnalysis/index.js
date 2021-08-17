import React from 'react'
import {useRecoilValue} from "recoil";
import {DataSourceState} from "../../state/data";

export default function DictionaryAnalysis() {
    const dataSources = useRecoilValue(DataSourceState)
    console.log(dataSources)
    return (
        <div className='column align-items-center center' style={{minHeight: 500}}><h3>Dictionary analysis</h3></div> //TODO: @james
    )
}


