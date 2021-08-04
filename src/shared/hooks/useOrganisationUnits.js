import {useDataQuery} from "@dhis2/app-runtime";
import {debounce, isEmpty} from 'lodash'
import {useEffect, useMemo, useState} from "react";

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
        orgUnits: id ? data?.orgUnit?.children ?? [] : [],
        loading,
        error,
        setId
    }
}

const orgUnitSearchQuery = {
    nameQuery: {
        resource: 'organisationUnits',
        params: ({keyword}) => ({
            filter: [
                `displayName:ilike:${keyword}`
            ],
            fields: [
                'id',
                'displayName',
                'path'
            ]
        })
    },
    idQuery: {
        resource: 'organisationUnits',
        params: ({keyword}) => ({
            filter: [
                `id:ilike:${keyword}`
            ]
        })
    },
}

export function useSearchOrganisationUnit() {
    const [keyword, setKeyword] = useState();
    const {data, error, loading, refetch} = useDataQuery(orgUnitSearchQuery, {lazy: true})

    const orgUnits = useMemo(() => {
        if (!isEmpty(data)) {
            const idResponse = data?.idQuery?.organisationUnits ?? [];
            const nameResponse = data?.nameQuery?.organisationUnits ?? [];
            return [...idResponse, ...nameResponse]
        }
        return []
    }, [data]);

    useEffect(() => {
        if (!isEmpty(keyword)) {
            debounce(() => refetch({keyword}), 1000)()
        }
    }, [keyword]);

    return {
        orgUnits,
        error,
        loading,
        setKeyword
    }
}
