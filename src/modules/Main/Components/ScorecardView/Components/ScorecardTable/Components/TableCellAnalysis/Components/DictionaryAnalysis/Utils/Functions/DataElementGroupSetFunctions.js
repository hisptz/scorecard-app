
const query = {
    dataSets:{
        resource:"dataSets",

        params:({id})=> ({
            fields:["id","displayName","periodType","timelyDays"],
            filter:[`dataSetElements.dataElement.id:eq:${id}`]
        })
    }
}


const query2={

    numeratorMatch:{
        resource: 'indicators',
        params: ({id}) => ({
            fields: [
                'id'
            ],
            filter:[`numerator:like:${id}`]
        })
    },
    denominatorMatch:{
        resource: 'indicators',
        params: ({id}) => ({
            fields: [
                'id'
            ],
            filter:[`denominator:like:${id}`]
        })
    }
}


export async function getNumDenMatch(engine, arr) {
    let allPromises = arr?.map((id) => {
        return new Promise((resolve, reject) => {
            resolve(getMatch(engine, id))
        })
    })
    return await Promise.all(allPromises).then(value => {
        return value.map((val, index) => { //We always return array just for uniformity

            return val
        })
    })

}


export async function getDataSetsArray(engine,arr){
    if(arr?.length>0){
        let allPromises= arr?.map((id)=>{
            return new Promise((resolve, reject) => {
                resolve(getDataSetsFromApi(engine,id))
            })})
        return await Promise.all(allPromises).then(value => {
            return  value.map((val,index)=>{ //We always return array just for uniformity
                return val?.dataSets
            })
        })

    }
}

async function getDataSetsFromApi(engine,id){
    const data=await engine.query(query,{variables:{id}})
    return data?.dataSets
}

async function getMatch(engine,id){
    const data=await engine.query(query2,{variables:{id}})
    return data
}
