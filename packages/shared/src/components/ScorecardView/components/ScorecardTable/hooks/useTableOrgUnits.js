import {useDataEngine} from "@dhis2/app-runtime";
import {isEmpty} from "lodash";
import {useEffect, useState} from "react";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import {
    PeriodResolverState,
    ScorecardNameSort,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState,
    ScorecardTableSortState,
    ScorecardViewState
} from "../../../../../state";
import {searchOrganisationUnit} from "../../../../../hooks";
import {Orientation, TableSort} from "../../../../../constants";
import {sortOrgUnitsBasedOnData, sortOrgUnitsBasedOnNames} from "../../../../../utils";


export default function useTableOrgUnits(dataEngine, orgUnits, nested) {
    const [loading, setLoading] = useState(false);
    const engine = useDataEngine();
    const setOrgUnits = useSetRecoilState(ScorecardOrgUnitState(orgUnits));
    const searchKeyword = useRecoilValue(
        ScorecardViewState("orgUnitSearchKeyword")
    );
    const {orgUnit: sort} = useRecoilValue(ScorecardNameSort(orgUnits));
    const dataSort = useRecoilValue(ScorecardTableSortState(orgUnits));
    const periods = useRecoilValue(PeriodResolverState);
    const orientation = useRecoilValue(ScorecardTableOrientationState);
    const [orgUnitSort, setOrgUnitSort] = useState();

    const setDefaults = useRecoilCallback(({reset}) => () => {
        reset(ScorecardOrgUnitState(orgUnits));
    });

    useEffect(() => {
        async function search() {
            const searchedOrgUnits = await searchOrganisationUnit(
                searchKeyword,
                engine
            );
            setOrgUnits((prevOrgUnits) => ({
                ...prevOrgUnits,
                filteredOrgUnits: searchedOrgUnits,
                childrenOrgUnits: [],
            }));
        }

        if (!isEmpty(searchKeyword) && !nested) {
            setLoading(true);
            search()
                .catch((e) => console.error(e))
                .finally(() => setLoading(false))
            ;
        } else {
            setDefaults();
        }
    }, [searchKeyword]);

    useEffect(() => {
        function setDataSort() {
            if (orientation === Orientation.ORG_UNIT_VS_DATA) {
                if (dataSort.type === "period") {
                    const [dx, pe] = dataSort.name?.split("-");
                    dataEngine
                        .sortOrgUnitsByDataAndPeriod({
                            dataSource: dx,
                            period: pe,
                            sortType: dataSort?.direction,
                        })
                        .subscribe(setOrgUnitSort);
                }
                if (dataSort.type === "data") {
                    const dx = dataSort?.name;
                    dataEngine
                        .sortOrgUnitsByData({
                            dataSource: dx,
                            periods: periods?.map(({id}) => id),
                            sortType: dataSort?.direction,
                        })
                        .subscribe(setOrgUnitSort);
                }
            }
        }

        if (dataSort) {
            setDataSort();
        }
    }, [sort, dataSort, orientation, dataEngine, periods]);

    useEffect(() => {
        function sortOrgUnits() {
            if (!isEmpty(orgUnitSort)) {
                setOrgUnits(({childrenOrgUnits, filteredOrgUnits}) => {
                    const {parentOrgUnits, childOrgUnits} = sortOrgUnitsBasedOnData({
                        orgUnitSort,
                        childrenOrgUnits,
                        filteredOrgUnits,
                    });
                    return {
                        filteredOrgUnits: parentOrgUnits,
                        childrenOrgUnits: childOrgUnits,
                    };
                });
            } else {
                setOrgUnits(({childrenOrgUnits, filteredOrgUnits}) => {
                    const {parentOrgUnits, childOrgUnits} = sortOrgUnitsBasedOnNames({
                        sort,
                        childrenOrgUnits,
                        filteredOrgUnits,
                    });
                    return {
                        filteredOrgUnits: parentOrgUnits,
                        childrenOrgUnits: childOrgUnits,
                    };
                });
            }
        }

        if (isEmpty(orgUnitSort) && sort === TableSort.DEFAULT) {
            setDefaults();
            return;
        }
        if (!isEmpty(orgUnitSort) || sort) {
            sortOrgUnits();
        }
    }, [orgUnitSort, sort]);

    return {
        loading,
    };
}
