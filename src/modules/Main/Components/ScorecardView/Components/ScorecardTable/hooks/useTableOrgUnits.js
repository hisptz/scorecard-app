import { useDataEngine } from "@dhis2/app-runtime";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { Orientation } from "../../../../../../../core/constants/orientation";
import { TableSort } from "../../../../../../../core/constants/tableSort";
import { PeriodResolverState } from "../../../../../../../core/state/period";
import {
  ScorecardOrgUnitState,
  ScorecardTableOrientationState,
  ScorecardTableSortState,
  ScorecardViewState,
} from "../../../../../../../core/state/scorecard";
import {
  sortOrgUnitsBasedOnData,
  sortOrgUnitsBasedOnNames,
} from "../../../../../../../core/state/utils";
import { searchOrganisationUnit } from "../../../../../../../shared/hooks/useOrganisationUnits";

export default function useTableOrgUnits(dataEngine, orgUnits) {
  const [loading, setLoading] = useState(false);
  const engine = useDataEngine();
  const setOrgUnits = useSetRecoilState(ScorecardOrgUnitState(orgUnits));
  const searchKeyword = useRecoilValue(
    ScorecardViewState("orgUnitSearchKeyword")
  );
  const { orgUnit: sort } = useRecoilValue(ScorecardViewState("tableSort"));
  const dataSort = useRecoilValue(ScorecardTableSortState);
  const periods = useRecoilValue(PeriodResolverState);
  const orientation = useRecoilValue(ScorecardTableOrientationState);
  const [orgUnitSort, setOrgUnitSort] = useState();

  const setDefaults = useRecoilCallback(({ reset }) => () => {
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

    if (!isEmpty(searchKeyword)) {
      setLoading(true);
      search()
        .then(() => setLoading(false))
        .catch((e) => console.error(e));
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
              periods: periods?.map(({ id }) => id),
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
        setOrgUnits(({ childrenOrgUnits, filteredOrgUnits }) => {
          const { parentOrgUnits, childOrgUnits } = sortOrgUnitsBasedOnData({
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
        setOrgUnits(({ childrenOrgUnits, filteredOrgUnits }) => {
          const { parentOrgUnits, childOrgUnits } = sortOrgUnitsBasedOnNames({
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
