import {useDataEngine, useDataQuery} from '@dhis2/app-runtime'
import {CircularLoader, DataTableCell,} from '@dhis2/ui'
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {  dataElementsStateDictionary,    dataSetReportingRatesStateDictionary,    programIndicatorStateDictionary} from "../../../../../../Store";
import {    getDetailedValueFromApi,    getFinalWordFormula,    getFormulaSources,    getSummaryValueFromApi} from "../../../../../../Utils/Functions/FormulaFunctions";
import {dataTypes} from "../../../../../../Utils/Models";
import CalculationDetails from "../../Index";
import classes from './Components/DataSourceCellStyle.module.css'
import DisplaySource from "./Components/DisplaySourceDataElement";
import DisplaySourceDataElement from "./Components/DisplaySourceDataElement";
import DisplaySourceDataSet from "./Components/DisplaySourceDataSet";
import DisplaySourceProgramIndicator from "./Components/DisplaySourceProgramIndicator";




export default function CalculationDetailRow({formula, location}){

    //variables
    const wordDtEl=[]
    const programInd=[]
    const dataSetReportingRates=[]

    //hooks
    const[dataElementsArray,setDataElementArray]=useState([])
    const[programIndicatorArray,setProgramIndicatorArray]=useState([])
    const[dataSetReportingRatesArray,setDataSetReportingRatesArray]=useState([])
    const engine = useDataEngine()
    const updateDataElementHandler= useSetRecoilState(dataElementsStateDictionary)
    const updateProgramIndicatorHandler= useSetRecoilState(programIndicatorStateDictionary)
    const updateDataSetReportingRatesHandler= useSetRecoilState(dataSetReportingRatesStateDictionary)

    //functions
    async function getWordData(arr,type){ //arr for array of id of datas to get their values, type indicates the data type of data eg dataElement=0 program indicator=1, reporting rates=2
        const allPromises=[];
        let i=0
        for(i=0;i<arr.length;i++){
            const proms=getDetailedValueFromApi(engine,arr[i],type)
            allPromises.push(proms)
        }
        i=0
        await Promise.all(allPromises).then(value => {
            if(type===dataTypes.DATA_ELEMENT){

                value.map((val)=>{ //We always return array just for uniformity
                    if(val.length===2){ //array of two elements first element is dataElement second element of array is category option combo
                        wordDtEl.push({id:arr[i],val:val[0].displayName+" "+val[1],location:location,sources:val[0].dataSetElements})
                    }if(val.length===1){   //this is array of one element for data element that are just pure no category options

                        wordDtEl.push({id:arr[i],val:val[0].displayName,"location":location,sources:val[0].dataSetElements})
                    }
                    ++i;
                })
            }
            if(type===dataTypes.PROGRAM_INDICATOR){
                value.map((val)=>{ //We always return array just for uniformity
                    programInd.push({"id":arr[i],"val":val[0].displayName,"location":location,sources:val[0].program})
                    ++i;
                })
            }
            if(type===dataTypes.DATASET_REPORTING_RATES){
                value.map((val)=>{ //We always return array just for uniformity
                    dataSetReportingRates.push({"id":arr[i],"val":val[0],"location":location})
                    ++i;
                })
            }

            if(wordDtEl.length===arr.length){ //array is full so we reload to update UI
                setDataElementArray(wordDtEl)
                updateDataElementHandler( (prev)=>{
                    return  prev.concat(wordDtEl)
                } )
            }
            if(programInd.length===arr.length){
                setProgramIndicatorArray(programInd)
                updateProgramIndicatorHandler((prev)=>{
                    return  prev.concat(programInd)
                }  )
            }
            if(dataSetReportingRates.length===arr.length){
                setDataSetReportingRatesArray(dataSetReportingRates)
                updateDataSetReportingRatesHandler((prev)=>{
                    return prev.concat(dataSetReportingRates)
                })
            }
        })
    }

    useEffect(()=>{
        const tempArr=getFormulaSources(formula,"#{")

        if(tempArr.length){
            getWordData(tempArr,dataTypes.DATA_ELEMENT),()=>{}
        }

        },[])
    useEffect(()=>{
        const tempArr=getFormulaSources(formula,"I{")
        if(tempArr.length){
            getWordData(tempArr,dataTypes.PROGRAM_INDICATOR),()=>{}
        }

        },[])
    useEffect(()=>{
        const tempArr=getFormulaSources(formula,"R{")
        if(tempArr.length){
            getWordData(tempArr,dataTypes.DATASET_REPORTING_RATES),()=>{}
        }

    },[])



    return      <>
                <DataTableCell  bordered width={"50%"}>

                    {getFinalWordFormula(formula,dataElementsArray,programIndicatorArray,dataSetReportingRatesArray,[],[])}
                </DataTableCell>
                <DataTableCell  bordered>
                    <div className={classes.sources} >
                        {dataElementsArray.length>0? <DisplaySourceDataElement title={"Data Elements"} data={dataElementsArray} /> :""}
                        {programIndicatorArray.length>0?  <DisplaySourceProgramIndicator title={"Program Indicators"} data={programIndicatorArray} />:""}
                        {dataSetReportingRatesArray.length>0?  <DisplaySourceDataSet title={"Data Sets"} data={dataSetReportingRatesArray} />:""}
                    </div>

                </DataTableCell>
             </>
}


CalculationDetailRow.propTypes={
    formula:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired
}
