import {useDataQuery} from "@dhis2/app-runtime";
import {useEffect, useState} from "react";

const orgUnitChildrenQuery = {
    orgUnit: {
        resource: 'organisationUnits',
        id: ({id}) => id,
        params: {
            fields: [
                'children[level,id,displayName,path]'
            ]
        },
    }
}

export function useOrganisationUnitChildren(orgUnitId = '') {
    const [id, setId] = useState(orgUnitId);
    const {data, loading, error, refetch} = useDataQuery(orgUnitChildrenQuery, {variables: {id: orgUnitId}, lazy: true})

    useEffect(() => {
        if (id) {
            refetch({id})
        }
    }, [id]);
    return {
        orgUnits: id ? data?.orgUnit?.children : [],
        loading,
        error,
        setId
    }
}
