import {filter, flatten, isEmpty} from "lodash";
import {useEffect} from "react";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {
    PeriodResolverState,
    ScorecardDataSourceState,
    ScorecardNameSort,
    ScorecardTableOrientationState,
    ScorecardTableSortState,
    ScorecardViewState
} from "../../../../../state";
import {Orientation} from "../../../../../constants";
import {sortDataSourcesBasedOnData, sortDataSourcesBasedOnNames} from "../../../../../utils";


export default function useTableDataSources(dataEngine, orgUnits) {
    const setDataSources = useSetRecoilState(ScorecardDataSourceState);
    const dataSearchKeyword = useRecoilValue(
        ScorecardViewState("dataSearchKeyword")
    );
    const {data: sort} = useRecoilValue(ScorecardNameSort(orgUnits));

    const resetDataSources = useResetRecoilState(ScorecardDataSourceState);

    const dataSort = useRecoilValue(ScorecardTableSortState(orgUnits));
    const periods = useRecoilValue(PeriodResolverState);
    const orientation = useRecoilValue(ScorecardTableOrientationState);

    useEffect(() => {
        function search() {
            setDataSources((prevDataSources) => {
                return filter(prevDataSources, (value) => {
                    const searchIndex = flatten(
                        value.dataSources?.map(
                            ({id, displayName}) => `${id}-${displayName}`
                        )
                    ).join("_");
                    return searchIndex
                        .toLowerCase()
                        .match(RegExp(dataSearchKeyword.toLowerCase()));
                });
            });
        }

        if (dataSearchKeyword) {
            search();
        } else {
            resetDataSources();
        }
    }, [dataSearchKeyword]);

    useEffect(() => {
        function sortDataSources() {
            let dataSourceSort = [];
            if (!isEmpty(dataSort)) {
                if (orientation === Orientation.DATA_VS_ORG_UNIT) {
                    if (dataSort.type === "orgUnit") {
                        dataEngine
                            .sortDataSourceByOrgUnit({
                                periods: periods?.map(({id}) => id),
                                orgUnit: dataSort?.name,
                                sortType: dataSort?.direction,
                            })
                            .subscribe((dSort) => (dataSourceSort = dSort));
                    }
                    if (dataSort.type === "period") {
                        const [ou, pe] = dataSort.name.split("-");
                        dataEngine
                            .sortDataSourceByOrgUnitAndPeriod({
                                period: pe,
                                orgUnit: ou,
                                sortType: dataSort?.direction,
                            })
                            .subscribe((dSort) => (dataSourceSort = dSort));
                    }
                }
            }

            if (!isEmpty(dataSourceSort)) {
                setDataSources((prevDataSources) => {
                    return sortDataSourcesBasedOnData({
                        dataSort: dataSourceSort,
                        dataSources: prevDataSources,
                    });
                });
            } else {
                setDataSources((prevDataSources) => {
                    return sortDataSourcesBasedOnNames({
                        sort: sortDataSources,
                        dataSources: prevDataSources,
                    });
                });
            }
        }

        if (sort) {
            sortDataSources();
        }
    }, [dataEngine, dataSort, orientation, periods, sort]);

    return {
        loading: false,
    };
}
