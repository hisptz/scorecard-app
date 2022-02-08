import {isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import ScorecardDataEngine from "../../../../../../../../../core/models/scorecardData";
import {ScorecardDataLoadingState, ScorecardOrgUnitState,} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";

export default function AverageDataContainer({
                                                 period,
                                                 dataSources,
                                                 orgUnit,
                                                 orgUnits,
                                                 dataEngine,
                                             }) {
    const [average, setAverage] = useState();
    const loading = useRecoilValue(ScorecardDataLoadingState(orgUnits));
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(
        ScorecardOrgUnitState(orgUnits)
    );

    function subscribe() {
        if (!loading) {
            let subscription;
            if (isEmpty(dataSources)) {
                subscription = dataEngine
                    .getOrgUnitColumnAverage({
                        period,
                        orgUnit,
                    })
                    .subscribe(setAverage);
            } else {
                subscription = dataEngine
                    .getDataSourceColumnAverage({
                        period,
                        dataSources: dataSources?.map(({id}) => id),
                        orgUnits: [...childrenOrgUnits, ...filteredOrgUnits]?.map(
                            ({id}) => id
                        ),
                    })
                    .subscribe(setAverage);
            }

            return () => {
                subscription.unsubscribe();
            };
        }
    }

    useEffect(subscribe, [
        loading,
        dataSources,
        orgUnit,
        period,
        childrenOrgUnits,
        filteredOrgUnits,
    ]);

    return <AverageCell dataSources={dataSources} bold value={average}/>;
}

AverageDataContainer.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    orgUnits: PropTypes.array.isRequired,
    period: PropTypes.string.isRequired,
    dataSources: PropTypes.array,
    orgUnit: PropTypes.string,
};
