import {getValueDataSourcePromise, isPureDataElement} from "./FormulaFunctions";
import {dataSourceTypes} from "../Models";
import _ from "lodash";

export default function IdentifiableObjectDataSource(engine,arrId){ //returns array of promises
    return arrId?.map((id)=>{
        return getValueDataSourcePromise(engine,id)
    })
}

export function getDataSourceType(formula){

    if(formula?.search("dataElements")>=0){
        return dataSourceTypes.DATA_ELEMENT
    }
    if(formula?.search("indicators")>=0){
        return dataSourceTypes.INDICATOR
    }
    if(formula?.search("programIndicators")>=0){
        return dataSourceTypes.PROGRAM_INDICATOR
    }
    if(formula?.search("dataElementGroups")>=0){
        return dataSourceTypes.DATA_ELEMENT_GROUP
    }
    if(formula?.search("indicatorGroups")>=0){
        return dataSourceTypes.INDICATOR_GROUP
    }
    if(formula?.search("dataStore/function")>=0){
        return dataSourceTypes.FUNCTION
    }
    if(formula?.search("dataSets")>=0){
        return dataSourceTypes.DATASET
    }
}


export function displayNameSelector(id,obj){

    if(isPureDataElement(id)){
        return obj.displayName
    }else{

        let ruleId=id.split(".")[1]
        let ruleObjectSelected=_.filter(obj?.rules,((e)=>{
            return e?.id===ruleId
        })) //will return matched object with one element

        return ruleObjectSelected[0]?.name
    }

}


export function displayNameLength(name){
    if(name?.length>18){
        return name?.substr(0,16)+"..."
    }else{
        return name;
    }

}

export function idOrRuleSelector(id,obj){
    if(isPureDataElement(id)){
        return obj.id
    }else{

        let ruleId=id.split(".")[1]
        let ruleObjectSelected=_.filter(obj?.rules,((e)=>{
            return e?.id===ruleId
        })) //will return matched object with one element

        return ruleObjectSelected[0]
    }
}


export function typeOrFunctionSelector(id,obj){
    if(isPureDataElement(id)){
        return getDataSourceType(obj.href)
    }else{
        return obj
    }
}


export function displayBool(val){
    if(val){
        return 'Yes'
    }else{
        return 'No'
    }


}