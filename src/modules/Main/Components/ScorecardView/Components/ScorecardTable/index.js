import {DataTable, DataTableBody} from "@dhis2/ui";
import {isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useRecoilValue, useResetRecoilState} from "recoil";
import {PeriodResolverState} from "../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState,
    scorecardDataEngine,
    ScorecardOrgUnitState,
    ScorecardTableConfigState,
    ScorecardTableOrientationState,
    ScorecardViewState,
} from "../../../../../../core/state/scorecard";
import useMediaQuery from "../../../../../../shared/hooks/useMediaQuery";
import {getHoldersFromGroups} from "../../../../../../shared/utils/utils";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import DataSourceRow from "./Components/DataSourceRow";
import EmptyDataGroups from "./Components/EmptyDataGroups";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";
import TableHeader from "./Components/TableHeader";

export default function ScorecardTable({orgUnits, nested}) {
    const {width: screenWidth} = useMediaQuery();
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState)
    const {tableWidth} = useRecoilValue(ScorecardTableConfigState(orgUnits))
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState("dataSelection")) ?? {};
    const dataHolders = getHoldersFromGroups(dataGroups)
    const periods = useRecoilValue(PeriodResolverState) ?? [];
    const {periodType} = useRecoilValue(ScorecardViewState("periodSelection"));
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))

    const resetKeyword = useResetRecoilState(
        ScorecardViewState("orgUnitSearchKeyword")
    );

    const [expandedOrgUnit, setExpandedOrgUnit] = useState();

    useEffect(() => {
        return () => {
            resetKeyword();
        };
    }, []);

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
        <div className="w-100 pb-32 flex-1">
            {isEmpty(dataGroups) ? (
                <EmptyDataGroups/>
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <DataTable
                        width={`${tableWidth}px`}
                        scrollWidth={`${screenWidth}px`}
                        layout="fixed"
                    >
                        <TableHeader orgUnits={filteredOrgUnits} nested={nested}/>
                        <DataTableBody>
                            {
                                tableOrientation === 'orgUnitsVsData' ? <Fragment>
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
                                    dataHolders?.map(({id, dataSources}) => (
                                        <DataSourceRow orgUnits={orgUnits} dataSources={dataSources} key={`${id}-row`}/>
                                    ))
                            }
                        </DataTableBody>
                    </DataTable>
                </DndProvider>
            )}
        </div>
    );
}

ScorecardTable.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
