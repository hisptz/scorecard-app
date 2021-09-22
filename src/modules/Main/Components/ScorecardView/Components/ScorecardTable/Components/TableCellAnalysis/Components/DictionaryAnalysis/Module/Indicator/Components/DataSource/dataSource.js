import {useDataQuery} from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {CircularLoader} from '@dhis2/ui'
import PropTypes from "prop-types";
import React, {useEffect} from 'react'
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
const query = {
    sources: {
        resource: "indicators",
        id: ({id}) => id,
        params: {
            fields: ["id", "displayName", "dataSets[id,displayName,timelyDays,periodType]"]
        }
    }
}

export default function DataSource({id}) {
    const {loading, error, data, refetch} = useDataQuery(query, {variables: {id}})

    useEffect(() => {
        refetch({id})
    }, [id])


    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <Error error={error} />

    }
    if (data?.sources?.dataSets.length === 0) {
        return <div/>
    }

    return (<div>

        <h3>{i18n.t("Data sources (Datasets/Programs)")}</h3>
        <p>
            {i18n.t('Indicator is captured from the following sources,')}
        </p>
        <h5>Datasets</h5>

        <ul>
            {data?.sources?.dataSets.map((dataSet) => {
                return <li key={dataSet?.id}><b>{dataSet?.displayName}</b> {i18n.t("submitting {{variables1}} after every {{variables2}} days",{variables1:dataSet?.periodType,variables2:dataSet?.timelyDays})}</li>
            })}
        </ul>

    </div>)

}


DataSource.propTypes = {
    id: PropTypes.string.isRequired
}
