import i18n from "@dhis2/d2-i18n";
import { DataTableColumnHeader, DataTableRow, Tooltip } from "@dhis2/ui";
import { head } from "lodash";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DraggableItems } from "../../../../../../../../../core/constants/draggables";
import { ScorecardTableConstants } from "../../../../../../../../../core/constants/table";
import { PeriodResolverState } from "../../../../../../../../../core/state/period";
import {
  ScorecardTableSortState,
  ScorecardViewState,
} from "../../../../../../../../../core/state/scorecard";
import { getDataSourcesDisplayName } from "../../../../../../../../../shared/utils/utils";
import classes from '../../../scorecardTable.module.css'
import DraggableCell from "../../TableBody/Components/DraggableCell";
import DroppableCell from "../../TableBody/Components/DroppableCell";
export default function HoldersHeaderRow() {
  const { dataGroups } =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
  const [{ name, direction }, setDataSort] = useRecoilState(
    ScorecardTableSortState
  );
  const periods = useRecoilValue(PeriodResolverState) ?? [];

  const onSortClick = (direction) => {
    setDataSort({
      ...direction,
      type: "data",
    });
  };

  return (
    <DataTableRow>
      {dataGroups?.map(({ dataHolders }) =>
        dataHolders?.map(({ id, dataSources }) => (
          <DataTableColumnHeader
            onSortIconClick={onSortClick}
            sortDirection={
              name === `${head(dataSources)?.id}` ? direction : "default"
            }
            className={classes['holder-header-cell']}
            dataTest={"indicator-table-header-cell"}
            width={`${periods?.length * ScorecardTableConstants.CELL_WIDTH}px`}
            top={"0"}
            fixed
            colSpan={`${periods?.length}`}
            bordered
            align="center"
            key={`${id}-column-header`}
            name={`${head(dataSources)?.id}`}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <Tooltip
                className="m-auto"
                content={i18n.t("Drag to row headers to change layout")}
              >
                <DroppableCell accept={[DraggableItems.ORG_UNIT_ROW]}>
                  <DraggableCell
                    label={getDataSourcesDisplayName(dataSources)}
                    type={DraggableItems.DATA_COLUMN}
                  />
                </DroppableCell>
              </Tooltip>
            </div>
          </DataTableColumnHeader>
        ))
      )}
    </DataTableRow>
  );
}
