import {DataTableBody} from "@dhis2/ui";
import {filter, flatten, isEmpty, sortBy} from "lodash";
import PropTypes from 'prop-types'
import React, {Fragment, useEffect, useMemo, useState} from "react";
import {useRecoilValue} from "recoil";
import {TableSort} from "../../../../../../../core/constants/tableSort";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState,
    ScorecardViewState
} from "../../../../../../../core/state/scorecard";
import {getHoldersFromGroups} from "../../../../../../../shared/utils/utils";
import ChildOrgUnitRow from "./ChildOrgUnitRow";
import DataSourceRow from "./DataSourceRow";
import ParentOrgUnitRow from "./ParentOrgUnitRow";

export default function ScorecardTableBody({orgUnits}) {
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState)
    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const dataSearchKeyword = useRecoilValue(ScorecardViewState('dataSearchKeyword'))
    const {data: sort} = useRecoilValue(ScorecardViewState('tableSort'))
    const dataHolders = getHoldersFromGroups(dataGroups)

    const filteredDataHolders = useMemo(() => {
        let filteredResult = dataHolders;
        if (!isEmpty(dataSearchKeyword)) {
            filteredResult = filter(dataHolders, (value) => {
                const searchIndex = flatten(value.dataSources?.map(({
                                                                        id,
                                                                        displayName
                                                                    }) => (`${id}-${displayName}`))).join('_')
                return searchIndex.toLowerCase().match(RegExp(dataSearchKeyword.toLowerCase()))
            })
        }


        if (sort === TableSort.DEFAULT || sort === TableSort.ASC) {
            filteredResult = sortBy(filteredResult, 'displayName');
        } else {
            filteredResult = sortBy(filteredResult, 'displayName').reverse();
        }


        return filteredResult;
    }, [dataHolders, dataSearchKeyword]);

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

