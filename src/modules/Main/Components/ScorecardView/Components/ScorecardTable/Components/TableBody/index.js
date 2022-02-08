import {DataTableBody} from "@dhis2/ui";
import {isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {Orientation} from "../../../../../../../../core/constants/orientation";
import ScorecardDataEngine from "../../../../../../../../core/models/scorecardData";
import {LowestOrgUnitLevel} from "../../../../../../../../core/state/orgUnit";
import {PeriodResolverState} from "../../../../../../../../core/state/period";
import {
    ScorecardDataLoadingState,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState,
    ScorecardViewState,
} from "../../../../../../../../core/state/scorecard";
import AverageDataSourceRow from "./Components/AverageDataSourceRow";
import AverageOrgUnitRow from "./Components/AverageOrgUnitRow";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import DataSourceRow from "./Components/DataSourceRow";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";

export default function ScorecardTableBody({orgUnits, dataEngine}) {
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState);
    const lowestOrgUnitLevel = useRecoilValue(LowestOrgUnitLevel);
    const {dataGroups} =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const {averageRow} = useRecoilValue(ScorecardViewState("options")) ?? {};
    const filteredDataHolders = useRecoilValue(ScorecardDataSourceState);
    const loading = useRecoilValue(ScorecardDataLoadingState(orgUnits));
    const periods = useRecoilValue(PeriodResolverState) ?? [];
    const {periodType} = useRecoilValue(ScorecardViewState("periodSelection"));
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(
        ScorecardOrgUnitState(orgUnits)
    );
    const [overallAverage, setOverallAverage] = useState();

    useEffect(() => {
        if (loading !== undefined && !loading) {
            dataEngine
                .getOverallAverage(
                    [...childrenOrgUnits, ...filteredOrgUnits]?.map(({id}) => id)
                )
                .subscribe(setOverallAverage);
        }
    }, [childrenOrgUnits, filteredOrgUnits, loading]);

    useEffect(() => {
        if (
            (orgUnits.length === 1 && !isEmpty(childrenOrgUnits)) ||
            orgUnits.length > 1
        ) {
            dataEngine
                .setDataGroups(dataGroups)
                .setPeriods(periods)
                .setOrgUnits([...(filteredOrgUnits ?? []), ...(childrenOrgUnits ?? [])])
                .setPeriodType(periodType)
                .load();
        }
    }, [dataGroups, filteredOrgUnits, childrenOrgUnits, periodType, periods]);
    return (
        <DataTableBody>
            {
                <Fragment>
                    {tableOrientation === Orientation.ORG_UNIT_VS_DATA ? (
                        <Fragment>
                            {filteredOrgUnits?.map((orgUnit, index) => (
                                <ParentOrgUnitRow
                                    index={index}
                                    dataEngine={dataEngine}
                                    key={`${orgUnit?.id}-row`}
                                    orgUnit={orgUnit}
                                    overallAverage={overallAverage}
                                    orgUnits={orgUnits}
                                />
                            ))}
                            {childrenOrgUnits?.map((orgUnit, index) => {
                                if(orgUnit.level === lowestOrgUnitLevel.level){

                                  return (
                                      <ParentOrgUnitRow
                                          index={index + 1}
                                          dataEngine={dataEngine}
                                          key={`${orgUnit?.id}-row`}
                                          orgUnit={orgUnit}
                                          overallAverage={overallAverage}
                                          orgUnits={orgUnits}
                                      />
                                  )
                                }

                                return (
                                    <ChildOrgUnitRow
                                        index={index}
                                        dataEngine={dataEngine}
                                        key={`${orgUnit?.id}-row`}
                                        onExpand={setExpandedOrgUnit}
                                        orgUnit={orgUnit}
                                        expandedOrgUnit={expandedOrgUnit}
                                        overallAverage={overallAverage}
                                        orgUnits={orgUnits}
                                    />
                                )
                            })}
                        </Fragment>
                    ) : (
                        filteredDataHolders?.map(({id, dataSources}, index) => (
                            <DataSourceRow
                                index={index}
                                dataEngine={dataEngine}
                                orgUnits={orgUnits}
                                dataSources={dataSources}
                                key={`${id}-row`}
                                overallAverage={overallAverage}
                            />
                        ))
                    )}
                    {averageRow &&
                        (tableOrientation === Orientation.ORG_UNIT_VS_DATA ? (
                            <AverageDataSourceRow
                                dataEngine={dataEngine}
                                orgUnits={orgUnits}
                                overallAverage={overallAverage}
                            />
                        ) : (
                            <AverageOrgUnitRow
                                dataEngine={dataEngine}
                                orgUnits={orgUnits}
                                overallAverage={overallAverage}
                            />
                        ))}
                </Fragment>
            }
        </DataTableBody>
    );
}

ScorecardTableBody.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
