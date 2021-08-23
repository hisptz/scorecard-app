import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {
    scorecardDataEngine,
    ScorecardDataLoadingState,
    ScorecardOrgUnitState
} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";

export default function AverageDataContainer({period, dataSources, orgUnit, orgUnits}) {
    const [average, setAverage] = useState();
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))

    function subscribe() {
        if (!loading) {
            let subscription;
            if (isEmpty(dataSources)) {
                subscription = scorecardDataEngine.getOrgUnitColumnAverage({
                    period,
                    orgUnit,
                }).subscribe(setAverage)
            } else {
                subscription = scorecardDataEngine.getDataSourceColumnAverage({
                    period,
                    dataSources,
                    orgUnits: [...childrenOrgUnits, ...filteredOrgUnits]?.map(({id}) => id)
                }).subscribe(setAverage)
            }

            return () => {
                subscription.unsubscribe();
            }
        }
    }

    useEffect(subscribe, [loading, dataSources, orgUnit, period])

    return (
        <AverageCell bold value={average}/>
    )
}

AverageDataContainer.propTypes = {
    orgUnits: PropTypes.array.isRequired,
    period: PropTypes.string.isRequired,
    dataSources: PropTypes.array,
    orgUnit: PropTypes.string,
};
