import {useDataQuery} from "@dhis2/app-runtime";
import {useEffect} from 'react'
import PropTypes from "prop-types";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";

const query = {
    programs: {
        resource: 'programStages',
        params: (({dataElementId})=>({
            fields: [
                'program[id,displayName]'
            ],
            filter: [
                `programStageDataElements.dataElement.id:eq:${dataElementId}`
            ]
        }))
    }
}

// https://dhis2.nnkogift.me/api/programStages.json?filter=programStageDataElements.dataElement.id:eq:qrur9Dvnyt5&fields=program[id,displayName]



export default  function Programs({id}){
    const dataElementId=id

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {dataElementId}})

    useEffect(()=>{refetch({id})},[id])


    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }


    return (<div>
        <h3>Data sources </h3>
        <p>
            Data element is captured from following sources

        </p>
        <h5>Programs</h5>

        <ul>
        {data?.programs?.programStages?.map((dt)=>{
            return <li key={dt?.program?.id}><b>{dt?.program?.displayName}</b> submitting records on every event(case or individual)</li>
        })}
        </ul>




    </div>)

}


//
//
// Programs.PropTypes={
//     id:PropTypes.string.isRequired
// }