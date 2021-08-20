import {DataTableBody} from "@dhis2/ui";
import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {Orientation} from "../../../../../../../../core/constants/orientation";
import {PeriodResolverState} from "../../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState,
    ScorecardViewState
} from "../../../../../../../../core/state/scorecard";
import AverageDataSourceRow from "./Components/AverageDataSourceRow";
import AverageOrgUnitRow from "./Components/AverageOrgUnitRow";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import DataSourceRow from "./Components/DataSourceRow";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";

export default function ScorecardTableBody({orgUnits}) {
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState)
    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const {averageRow} = useRecoilValue(ScorecardViewState("options")) ?? {};
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
    }, [dataGroups, filteredOrgUnits, childrenOrgUnits, periodType, periods]);


    return (
        <DataTableBody>
            {
                <Fragment>
                    {
                        tableOrientation === Orientation.ORG_UNIT_VS_DATA ?
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
                    {
                        averageRow && (
                            tableOrientation === Orientation.ORG_UNIT_VS_DATA ?
                                <AverageDataSourceRow orgUnits={orgUnits} /> :
                                <AverageOrgUnitRow orgUnits={orgUnits}/>

                        )
                    }
                </Fragment>

            }
        </DataTableBody>
    )
}

ScorecardTableBody.propTypes = {
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired
};

