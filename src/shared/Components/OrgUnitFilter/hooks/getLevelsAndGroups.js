import {useDataQuery} from "@dhis2/app-runtime";


const query = {
    levels: {
        resource: 'organisationUnitLevels',
        params: {
            fields: ['displayName', 'id', 'level', 'name'],
            order: 'name:asc'
        }
    },
    groups: {
        resource: 'organisationUnitGroups',
        params: {
            fields: ['displayName', 'id', 'name'],
            order: 'name:asc'
        }
    },
}

export default function useOrgUnitLevelsAndGroups() {
    const {data, loading, error} = useDataQuery(query)
    return {loading, levels: data?.levels?.organisationUnitLevels, groups: data?.groups?.organisationUnitGroups, error}
}
