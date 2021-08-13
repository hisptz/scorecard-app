import {useAlert} from "@dhis2/app-runtime";
import {DataTable, DataTableBody} from "@dhis2/ui";
import {head, isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useRecoilValue, useResetRecoilState} from "recoil";
import {PeriodResolverState} from "../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState,
    scorecardDataEngine,
    ScorecardTableConfigState,
    ScorecardTableOrientationState,
    ScorecardViewState,
} from "../../../../../../core/state/scorecard";
import useMediaQuery from "../../../../../../shared/hooks/useMediaQuery";
import {
    useOrganisationUnitChildren,
    useSearchOrganisationUnit,
} from "../../../../../../shared/hooks/useOrganisationUnits";
import {getHoldersFromGroups} from "../../../../../../shared/utils/utils";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import DataSourceRow from "./Components/DataSourceRow";
import EmptyDataGroups from "./Components/EmptyDataGroups";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";
import TableHeader from "./Components/TableHeader";
import TableLoader from "./Components/TableLoader";

export default function ScorecardTable({orgUnits, nested}) {
    const tableOrientation = useRecoilValue(ScorecardTableOrientationState)
    const {tableWidth} = useRecoilValue(ScorecardTableConfigState)
    const {width: screenWidth} = useMediaQuery();
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState("dataSelection")) ?? {};
    const dataHolders = getHoldersFromGroups(dataGroups)
    const periods = useRecoilValue(PeriodResolverState) ?? [];
    const {periodType} = useRecoilValue(ScorecardViewState("periodSelection"));


    const searchKeyword = useRecoilValue(
        ScorecardViewState("orgUnitSearchKeyword")
    );
    const resetKeyword = useResetRecoilState(
        ScorecardViewState("orgUnitSearchKeyword")
    );


    const {
        orgUnits: searchResults,
        updateKeyword,
        error: searchError,
        loading: searchLoading,
    } = useSearchOrganisationUnit();
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();

    const filteredOrgUnits = useMemo(() => {
        if (searchResults && searchKeyword) {
            return searchResults ?? [];
        }
        return orgUnits;
    }, [searchResults, orgUnits, searchKeyword]);

    const {
        loading,
        error,
        orgUnits: childrenOrgUnits,
        setId,
    } = useOrganisationUnitChildren(
        filteredOrgUnits?.length === 1 ? head(filteredOrgUnits)?.id : null
    );

    useEffect(() => {
        if (filteredOrgUnits.length === 1) setId(head(filteredOrgUnits)?.id);
        else setId(undefined);
        return () => {
            setId(undefined);
        };
    }, [filteredOrgUnits]);

    useEffect(() => {
        if (!isEmpty(searchKeyword)) {
            updateKeyword(searchKeyword);
        } else {
            updateKeyword(undefined);
        }
    }, [searchKeyword]);

    useEffect(() => {
        if (error) {
            show({message: error?.message ?? error?.details, type: {info: true}});
        }
        if (searchError) {
            show({
                message: searchError?.message ?? searchError?.details,
                type: {info: true},
            });
        }
    }, [error, searchError]);

    useEffect(() => {
        return () => {
            resetKeyword();
        };
    }, []);

    useEffect(() => {
        if (!loading && !error) {
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
                        <TableHeader nested={nested}/>
                        <DataTableBody>
                            {loading ? (
                                <TableLoader/>
                            ) : searchLoading ? (
                                <td>Searching...</td>
                            ) : (
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
                                        <DataSourceRow dataSources={dataSources} key={`${id}-row`}/>
                                    ))
                            )}
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
