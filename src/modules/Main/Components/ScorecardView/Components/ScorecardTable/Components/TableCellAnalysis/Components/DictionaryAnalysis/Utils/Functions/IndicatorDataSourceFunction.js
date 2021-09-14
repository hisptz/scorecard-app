
const query={
    identifiableObjects:{
        resource:"identifiableObjects",
        id: ({id})=>id,
        params:{
            fields:["id","displayName"]
        }
    }
}


const query2={
    program:{
        resource:"programIndicators",
        id: ({id})=>id,
        params:{
            fields:["program[id,displayName]"]
        }
    }
}



export async function getProgramFromAttributesOrDtElPrg(engine,arr){
    if(arr?.length>0){
        let allPromises= arr?.map((id)=>{
            return new Promise((resolve, reject) => {
                resolve(getProgramFromAttributesOrDtElPrgFromApi(engine,id))
            })})
        return await Promise.all(allPromises).then(value => {
            return  value.map((val,index)=>{
                return val
            })
        })

    }
}

async function getProgramFromAttributesOrDtElPrgFromApi(engine,id){
    const data=await engine.query(query,{variables:{id}})
    return data?.identifiableObjects
}



export async function getProgramFromProgramIndicator(engine,arr){
    if(arr?.length>0){
        let allPromises= arr?.map((id)=>{
            return new Promise((resolve, reject) => {
                resolve(getProgramFromProgramIndicatorApi(engine,id))
            })})
        return await Promise.all(allPromises).then(value => {
            return  value.map((val,index)=>{ //We always return array just for uniformity
                return val
            })
        })

    }
}

async function getProgramFromProgramIndicatorApi(engine,id){
    const data=await engine.query(query2,{variables:{id}})
    return data?.program?.program
}


