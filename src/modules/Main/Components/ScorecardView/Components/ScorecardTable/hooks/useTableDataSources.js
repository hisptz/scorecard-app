import { filter, flatten, isEmpty } from "lodash";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Orientation } from "../../../../../../../core/constants/orientation";
import { PeriodResolverState } from "../../../../../../../core/state/period";
import {
  ScorecardDataSourceState,
  ScorecardTableOrientationState,
  ScorecardTableSortState,
  ScorecardViewState,
} from "../../../../../../../core/state/scorecard";
import {
  sortDataSourcesBasedOnData,
  sortDataSourcesBasedOnNames,
} from "../../../../../../../core/state/utils";

export default function useTableDataSources(dataEngine) {
  const setDataSources = useSetRecoilState(ScorecardDataSourceState);
  const dataSearchKeyword = useRecoilValue(
    ScorecardViewState("dataSearchKeyword")
  );
  const { data: sort } = useRecoilValue(ScorecardViewState("tableSort"));

  const dataSort = useRecoilValue(ScorecardTableSortState);
  const periods = useRecoilValue(PeriodResolverState);
  const orientation = useRecoilValue(ScorecardTableOrientationState);

  useEffect(() => {
    function search() {
      setDataSources((prevDataSources) => {
        return filter(prevDataSources, (value) => {
          const searchIndex = flatten(
            value.dataSources?.map(
              ({ id, displayName }) => `${id}-${displayName}`
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
                periods: periods?.map(({ id }) => id),
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
