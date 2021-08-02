import { DataTableCell, DataTableRow } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  ScorecardConfigStateSelector,
  ScorecardViewSelector,
} from "../../../../../../../core/state/scorecard";
import ScorecardTable from "../index";
import OrgUnitContainer from "./OrgUnitContainer";
import DataContainer from "./TableDataContainer";

export default function ChildOrgUnitRow({
  orgUnit,
  expandedOrgUnit,
  onExpand,
  scorecardDataEngine,
}) {
  const { id } = orgUnit ?? {};
  const { dataGroups } =
    useRecoilValue(ScorecardConfigStateSelector("dataSelection")) ?? {};
  const { periods } =
    useRecoilValue(ScorecardViewSelector("periodSelection")) ?? [];
  return (
    <DataTableRow
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
          <ScorecardTable
            nested={true}
            orgUnits={[orgUnit]}
            scorecardDataEngine={scorecardDataEngine}
          />
        </div>
      }
      key={id}
      bordered
    >
      <DataTableCell fixed left={"50px"}>
        <OrgUnitContainer orgUnit={orgUnit} />
      </DataTableCell>
      {dataGroups?.map(({ id: groupId, dataHolders }) =>
        dataHolders?.map(({ id: holderId, dataSources }) =>
          periods?.map(({ id: periodId }) => (
            <td
              className="data-cell"
              align="center"
              key={`${groupId}-${holderId}-${periodId}`}
            >
              <DataContainer
                orgUnitId={id}
                dataSources={dataSources}
                periodId={periodId}
              />
            </td>
          ))
        )
      )}
    </DataTableRow>
  );
}

ChildOrgUnitRow.propTypes = {
  orgUnit: PropTypes.object.isRequired,
  onExpand: PropTypes.func.isRequired,
  expandedOrgUnit: PropTypes.string,
};
