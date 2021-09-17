import {useConfig, useDataQuery} from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {CircularLoader} from '@dhis2/ui'
import PropTypes from "prop-types";
import React, {useEffect} from 'react'
import classes from './introduction.module.css'
import IdentifiedBy from "../../../../Shared/Componets/IdentifiedBy/Index";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
const query = {

    indicatorsDetails: {
        resource: "indicators",
        id: ({id}) => id,
        params: {
            fields: ["id", "name", "displayDescription", "href", "numeratorDescription", "denominatorDescription",
                "indicatorType[displayName,id]",
            ]
        }
    }

}

export default function Introduction({id}) {

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

    const indicatorDetails = data?.indicatorsDetails;

    return (<div>

            <h2>{indicatorDetails?.name} </h2>

            <h3>{i18n.t('Introduction')}</h3>

            <p>
                <b>{indicatorDetails?.name} </b>
                {i18n.t("is a")}
                <b> {indicatorDetails?.indicatorType?.displayName} </b>
                {i18n.t("indicator, measured by")}
                <b> {indicatorDetails?.numeratorDescription} </b>
                {i18n.t("to")}<b> {indicatorDetails?.denominatorDescription} </b>
            </p>

            <p>
                {i18n.t("Its described as {{variable}}",{variable:indicatorDetails?.displayDescription})}
            </p>

            <IdentifiedBy id={indicatorDetails?.id} href={indicatorDetails?.href} />

        </div>
    )


}


Introduction.propTypes = {
    id: PropTypes.string.isRequired
};

