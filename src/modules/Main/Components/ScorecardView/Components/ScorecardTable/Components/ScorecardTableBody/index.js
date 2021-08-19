import {DataTableBody} from "@dhis2/ui";
import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState,
    ScorecardViewState
} from "../../../../../../../../core/state/scorecard";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import DataSourceRow from "./Components/DataSourceRow";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";

export default function ScorecardTableBody({orgUnits}) {
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState)
    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const filteredDataHolders = useRecoilValue(ScorecardDataSourceState)

    const periods = useRecoilValue(PeriodResolverState) ?? [];
    const {periodType} = useRecoilValue(ScorecardViewState("periodSelection"));

    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))


    useEffect(() => {
        if (
            (orgUnits.length === 1 && !isEmpty(childrenOrgUnits)) ||
            orgUnits.length > 1
        ) {
            scorecardDataEngine
                .setDataGroups(dataGroups)
                .setPeriods(periods)
                .setOrgUnits([
                    ...(filteredOrgUnits ?? []),
                    ...(childrenOrgUnits ?? []),
                ])
                .setPeriodType(periodType)
                .load();
        }
    }, [dataGroups, filteredOrgUnits, childrenOrgUnits, periodType]);

    return (
        <DataTableBody>
            {
                tableOrientation === 'orgUnitsVsData' ?
                    <Fragment>
                        {filteredOrgUnits?.map((orgUnit) => (
                            <ParentOrgUnitRow
                                key={`${orgUnit?.id}-row`}
                                orgUnit={orgUnit}
                            />
                        ))}
                        {childrenOrgUnits?.map((orgUnit) => (
                            <ChildOrgUnitRow
                                key={`${orgUnit?.id}-row`}
                                onExpand={setExpandedOrgUnit}
                                orgUnit={orgUnit}
                                expandedOrgUnit={expandedOrgUnit}
                            />
                        ))}
                    </Fragment> :
                    filteredDataHolders?.map(({id, dataSources}) => (
                        <DataSourceRow orgUnits={orgUnits} dataSources={dataSources} key={`${id}-row`}/>
                    ))
            }
        </DataTableBody>
    )
}

ScorecardTableBody.propTypes = {
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired
};

