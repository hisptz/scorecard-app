import {dataTypes} from "../Models";

const query1={
    identifiableObjects:{
        resource:"identifiableObjects",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","href"]
        }
    }
}

const query2={
    identifiableObjects:{
        resource:"identifiableObjects",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","href"]
        }
    },
    identifiableObjects2:{
        resource:"identifiableObjects",
        id: ({id2})=>id2,
        params:{
            fields:["id","displayName","href"]
        }
    }
}
const query3={
    dataElementSource:{
        resource:"dataElements",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","dataSetElements[dataSet[id,displayName]]"]
        }
    }
}
const query4={
    dataElementSource:{
        resource:"dataElements",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","dataSetElements[dataSet[id,displayName]]"]
        }
    },
    identifiableObjects:{
        resource:"identifiableObjects",
        id: ({idCombo})=>idCombo,
        params:{
            fields:["id","displayName"]
        }
    }
}

const query5={
    programIndicators:{
        resource:"programIndicators",
        id: ({id})=>id,
        params:{
            fields:["id","displayName","program[id,displayName]"]
        }
    }
}



export function getFormulaSources(formula,sourceInitial){
    let ind1=0
    let ind2=0
    let arr=[]

    while(formula?.search(sourceInitial)>=0){//there is still a dataElement
        ind1=formula.indexOf(sourceInitial) //first occourance
        let subStr= formula.substr(ind1)
        ind2=subStr.indexOf("}")
        ind2=ind2+ind1

        let datEl = formula.substring(ind1+2,ind2);
        arr.push(datEl)

        formula= setCharAt(formula,ind1,"")         //remove {
        formula= setCharAt(formula,ind1-1,"")       //removes #
        formula=setCharAt(formula,ind2-2,"")          //removes }

    }

    if(sourceInitial==="R{"){
        let resultedArr=[]
        arr.filter((ele)=>{
            resultedArr.push(ele.split(".")[0])  //elements comes as BfMAe6Itzgt.REPORTING_RATE or OsPTWNqq26W.EXPECTED_REPORTS so we do this to just take the id
        })
        arr=resultedArr
    }

    return arr
}

export function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

async function getValueIdentifiableObjects2(engine,id,id2){
    const data= await engine.query(query2,{variables: {id,id2}})
    return [data?.identifiableObjects?.displayName, data?.identifiableObjects2.displayName]
}

async function getValueIdentifiableObjects(engine,id){
    const data=await engine.query(query1,{variables:{id}})
    return [data?.identifiableObjects?.displayName]
}

async function getValueDataElementSource(engine,id){
    const data=await engine.query(query3,{variables:{id}})
    return [data?.dataElementSource]
}

async function getValueProgramIndicator(engine,id){
    const data=await engine.query(query5,{variables:{id}})
    return [data?.programIndicators]
}
async function getValueDataElementSourceWithCombo(engine,id,idCombo){
   const data=await engine.query(query4,{variables:{id,idCombo}})
    return [data?.dataElementSource, data?.identifiableObjects.displayName]
}

async function getValueDataSource(engine,id){
    const data=await engine.query(query1,{variables:{id}})
    return [data?.identifiableObjects]
}

export function getFormulaInWordsFromFullSources(formula,arrOfSources) {

    for( let i=0;i<arrOfSources.length;i++){
        if(formula?.search(arrOfSources[i].id)>=0){
            formula=formula.replace(arrOfSources[i].id,arrOfSources[i].val);
        }
    }
    return formula
}

export function getFinalWordFormula(formula,dataElementsArray,programIndicatorArray,dataSetReportingRatesArray,attributes,constants){

    let final=getFormulaInWordsFromFullSources(formula,dataElementsArray)?.replace(/#/g,"")
    final =getFormulaInWordsFromFullSources(final,programIndicatorArray)
    final =getFormulaInWordsFromFullSources(final,dataSetReportingRatesArray)
    final =getFormulaInWordsFromFullSources(final,attributes)
    final =getFormulaInWordsFromFullSources(final,constants)


    while(final?.search("I{")>=0) {//removes I
        let indexChar=final.search("I{")
        final = setCharAt(final, indexChar, "")
    }

    while(final?.search("R{")>=0) {//removes R
        let indexChar=final.search("R{")
        final = setCharAt(final, indexChar, "")
    }

    while(final?.search("A{")>=0) {//removes A
        let indexChar=final.search("A{")
        final = setCharAt(final, indexChar, "")
    }
    while(final?.search("C{")>=0) {//removes C
        let indexChar=final.search("C{")
        final = setCharAt(final, indexChar, "")
    }
    while(final?.search("V{")>=0) {//removes C
        let indexChar=final.search("V{")
        final = setCharAt(final, indexChar, "")
    }

    if(dataSetReportingRatesArray?.length!==0){
        //replace those caps
        //has to be fixed later
        final=final?.replace(/ACTUAL_REPORTS/g,"Actual_Reports")
        final=final?.replace(/REPORTING_RATE_ON_TIME/g,"Reporting_on_Time")
        final=final?.replace(/EXPECTED_REPORTS/g,"Expected_Reports")
        final=final?.replace(/REPORTING_RATE/g,"Reporting_Rate")
        final=final?.replace(/ACTUAL_REPORTS_ON_TIME/g,"Actual_Reports_on_Time")

    }

    final=final?.replace(/_/g," ")
    final=final?.replace(/\./g,' ')
    // final=lowerCaseAllWordsExceptFirstLetters(final)

    // while (final?.search("_")>=0){
    //     console.log("serching..")
    //     let indexChar=final.search("_")
    //     final = setCharAt(final, indexChar, " ")
    // }
    // while (final?.search(".")>=0){
    //     console.log("ser")
    //     let indexChar=final.search(".")
    //     final = setCharAt(final, indexChar, " ")
    // }


    return cleanBrackets(final)
}

export function lowerCaseAllWordsExceptFirstLetters(string) {
    return string?.replace(/\S*/g, function (word) {
        return word?.charAt(0) + word?.slice(1).toLowerCase();
    });
}

export function getSummaryValueFromApi(engine, id){
    if(isPureDataElement(id)){
        //fetch value normally
        return new Promise((resolve, reject) => {
            resolve(getValueIdentifiableObjects(engine,id))
        })
    }else{
        //break to array and just take first element
        return new Promise(((resolve, reject) => {
            let arr = id.split(".")
            resolve(getValueIdentifiableObjects2(engine,arr[0], arr[1]));
        }))
    }
}
export function getDetailedValueFromApi(engine,id,type){
    if(type===dataTypes.DATA_ELEMENT){
        if(isPureDataElement(id)){
            //fetch value normally
            return new Promise((resolve, reject) => {
                resolve(getValueDataElementSource(engine,id))
            })
        }else{
            //break to array and just take first element
            return new Promise(((resolve, reject) => {
                let arr = id.split(".")
                resolve(getValueDataElementSourceWithCombo(engine,arr[0], arr[1]));
            }))
        }
    }
    if(type===dataTypes.PROGRAM_INDICATOR){
        return new Promise((resolve, reject) => {
            resolve(getValueProgramIndicator(engine,id))
        })
    }
    else{
        return new Promise((resolve, reject) => {
            resolve(getValueIdentifiableObjects(engine,id))
        })
    }


}

export function getValueDataSourcePromise(engine,id){
    return new Promise((resolve, reject) => {
        resolve(getValueDataSource(engine,id))
    })
}


function cleanBrackets(formula){
    if(typeof(formula) !=dataTypes.UNDEFINED){
        let arr= formula.split("{");
        arr=arr.join("")
        arr=arr.split("}")
        //string = array.join("")
        arr=arr.join(" ")

        return arr
    }
    return formula

}

function isPureDataElement(str){
    if(str.indexOf(".")==-1){ //didnt find
        return true
    }else{
        return false;
    }
}
