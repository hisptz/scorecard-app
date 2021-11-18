import { DataTable } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { Suspense, useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilCallback, useRecoilValue } from "recoil";
import ScorecardDataEngine from "../../../../../../core/models/scorecardData";
import {
  ScorecardDataLoadingState,
  ScorecardTableConfigState,
  ScorecardViewState,
} from "../../../../../../core/state/scorecard";
import { ScreenDimensionState } from "../../../../../../core/state/window";
import ScorecardTableBody from "./Components/TableBody";
import TableHeader from "./Components/TableHeader";
import TableLoader, { TableLinearLoader } from "./Components/TableLoader";
import useTableConfig from "./hooks/useTableConfig";

export default function ScorecardTable({
  orgUnits,
  nested,
  initialDataEngine,
}) {
  const dataEngine = useMemo(
    () => initialDataEngine ?? new ScorecardDataEngine(),
    [initialDataEngine]
  );
  const { loading } = useTableConfig(dataEngine, orgUnits);

  const { width: screenWidth } = useRecoilValue(ScreenDimensionState);
  const { tableWidth } = useRecoilValue(ScorecardTableConfigState(orgUnits));
  const reset = useRecoilCallback(({ reset }) => () => {
    reset(ScorecardViewState("orgUnitSearchKeyword"));
    reset(ScorecardDataLoadingState(orgUnits));
    dataEngine.reset();
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className="w-100 pb-32 flex-1 print-area scorecard-table">
      {loading ? (
        <TableLoader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <DataTable
            className="table-print"
            layout="fixed"
            scrollWidth={tableWidth ?? screenWidth}
          >
            <TableHeader
              width={screenWidth}
              orgUnits={orgUnits}
              nested={nested}
            />
            <TableLinearLoader orgUnits={orgUnits} dataEngine={dataEngine} />
            <Suspense fallback={<TableLoader orgUnits={orgUnits} />}>
              <ScorecardTableBody dataEngine={dataEngine} orgUnits={orgUnits} />
            </Suspense>
          </DataTable>
        </DndProvider>
      )}
    </div>
  );
}

ScorecardTable.propTypes = {
  nested: PropTypes.bool.isRequired,
  orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialDataEngine: PropTypes.instanceOf(ScorecardDataEngine),
};
