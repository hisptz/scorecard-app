import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {scorecardDataEngine} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";

export default function AverageDataContainer({period, dataSources, orgUnit}) {
    const [average, setAverage] = useState();

    useEffect(() => {

        let subscription;
        if (isEmpty(dataSources)) {
            subscription = scorecardDataEngine.getOrgUnitColumnAverage({period, orgUnit}).subscribe(setAverage)
        } else {
            subscription = scorecardDataEngine.getDataSourceColumnAverage({period, dataSources}).subscribe(setAverage)
        }

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <AverageCell bold value={average}/>
    )
}

AverageDataContainer.propTypes = {
    period: PropTypes.string.isRequired,
    dataSources: PropTypes.array,
    orgUnit: PropTypes.string
};
