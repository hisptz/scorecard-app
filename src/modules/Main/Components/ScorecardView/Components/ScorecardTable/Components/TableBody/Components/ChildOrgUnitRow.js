import i18n from "@dhis2/d2-i18n";
import { DataTableCell, DataTableRow, Tooltip } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { Suspense, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import AverageDisplayType from "../../../../../../../../../core/constants/averageDisplayType";
import { DraggableItems } from "../../../../../../../../../core/constants/draggables";
import ScorecardDataEngine from "../../../../../../../../../core/models/scorecardData";
import { PeriodResolverState } from "../../../../../../../../../core/state/period";
import {
  ScorecardDataLoadingState,
  ScorecardViewState,
} from "../../../../../../../../../core/state/scorecard";
import ScorecardTable from "../../../index";
import classes from '../../../scorecardTable.module.css'
import DataContainer from "../../TableDataContainer";
import TableLoader from "../../TableLoader";
import AverageCell from "./AverageCell";
import DroppableCell from "./DroppableCell";
import OrgUnitContainer from "./OrgUnitContainer";
export default function ChildOrgUnitRow({
  orgUnit,
  expandedOrgUnit,
  onExpand,
  overallAverage,
  dataEngine,
  orgUnits,
  index,
}) {
  const { emptyRows, averageColumn, averageDisplayType, itemNumber } =
    useRecoilValue(ScorecardViewState("options"));

  const [isEmpty, setIsEmpty] = useState(false);
  const [average, setAverage] = useState();
  const { id } = orgUnit ?? {};
  const { dataGroups } =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
  const loading = useRecoilValue(ScorecardDataLoadingState(orgUnits));
  const periods = useRecoilValue(PeriodResolverState) ?? [];

  function subscribe() {
    if (loading !== undefined && !loading) {
      const rowAverage = dataEngine.getOrgUnitAverage(id).subscribe(setAverage);
      const rowStatusSub = dataEngine.isRowEmpty(id).subscribe(setIsEmpty);

      return () => {
        rowAverage.unsubscribe();
        rowStatusSub.unsubscribe();
      };
    }
  }

  useEffect(subscribe, [orgUnit, loading, id, dataEngine]);
  const Component = (emptyRows || !isEmpty) && (
    <DataTableRow
      dataTest={"orgUnit-children-table-column-cell"}
      className={classes["child-table-row"]}
      expanded={id === expandedOrgUnit}
      onExpandToggle={() => {
        if (id === expandedOrgUnit) {
          onExpand(undefined);
        } else {
          onExpand(id);
        }
      }}
      expandableContent={
        <div className="p-16">
          <Suspense fallback={<TableLoader />}>
            <ScorecardTable nested orgUnits={[id]} />
          </Suspense>
        </div>
      }
      key={id}
      bordered
    >
      {itemNumber && (
        <DataTableCell width={"50px"} fixed left={"50px"}>
          {index + 2}
        </DataTableCell>
      )}
      <DataTableCell
        dataTest={"orgUnit-parent-table-column-cell"}
        fixed
        left={itemNumber ? "100px" : "50px"}
      >
        <Tooltip content={i18n.t("Drag to column headers to change layout")}>
          <DroppableCell accept={[DraggableItems.DATA_COLUMN]}>
            <OrgUnitContainer orgUnit={orgUnit} />
          </DroppableCell>
        </Tooltip>
      </DataTableCell>
      {dataGroups?.map(({ id: groupId, dataHolders }) =>
        dataHolders?.map(({ id: holderId, dataSources }) =>
          periods?.map((period) => (
            <td
              className="data-cell"
              align="center"
              key={`${groupId}-${holderId}-${period.id}`}
            >
              <DataContainer
                dataEngine={dataEngine}
                orgUnit={orgUnit}
                dataSources={dataSources}
                period={period}
              />
            </td>
          ))
        )
      )}
      {averageColumn && <AverageCell  bold value={average} />}
    </DataTableRow>
  );

  if (averageDisplayType === AverageDisplayType.ALL) {
    return Component;
  }
  if (
    averageDisplayType === AverageDisplayType.BELOW_AVERAGE &&
    overallAverage > average
  ) {
    return Component;
  }
  if (
    averageDisplayType === AverageDisplayType.ABOVE_AVERAGE &&
    overallAverage <= average
  ) {
    return Component;
  }

  return null;
}

ChildOrgUnitRow.propTypes = {
  dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
  index: PropTypes.number.isRequired,
  orgUnit: PropTypes.object.isRequired,
  orgUnits: PropTypes.array.isRequired,
  overallAverage: PropTypes.number.isRequired,
  onExpand: PropTypes.func.isRequired,
  expandedOrgUnit: PropTypes.string,
};
