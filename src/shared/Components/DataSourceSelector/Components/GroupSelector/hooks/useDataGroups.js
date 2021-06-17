import {useDataEngine} from "@dhis2/app-runtime";
import {useEffect, useState} from "react";


export default function useDataGroups(initialSelectedDataType) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const engine = useDataEngine()
    const query = {
        groups: {
            resource: initialSelectedDataType?.groupResource,
            params: {
                fields: [
                    'displayName',
                    'id',
                    `${initialSelectedDataType.resource}[displayName,id]`
                ]
            }
        }
    }

    useEffect(() => {
        async function fetch(){
           if(initialSelectedDataType && initialSelectedDataType.groupResource){
               setLoading(true)
               try{
                   const response = await engine.query(query)
                   if(response){
                       setData(response.groups?.[`${initialSelectedDataType.groupResource}`])
                   }

               }catch (e){
                   setError(e);
               }
               setLoading(false)
           }
        }
        fetch();
    }, [initialSelectedDataType]);

    return {loading, groups: data, error}
}

