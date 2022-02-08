import i18n from "@dhis2/d2-i18n";
import { DataTableCell, DataTableRow } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue } from "recoil";
import ScorecardDataEngine from "../../../../../../../../../core/models/scorecardData";
import { PeriodResolverState } from "../../../../../../../../../core/state/period";
import {
  ScorecardDataSourceState,
  ScorecardViewState,
} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";
import AverageDataContainer from "./AverageDataContainer";

export default function AverageDataSourceRow({
  orgUnits,
  overallAverage,
  dataEngine,
}) {
  const periods = useRecoilValue(PeriodResolverState);
  const dataHolders = useRecoilValue(ScorecardDataSourceState);
  const { averageColumn, itemNumber } = useRecoilValue(
    ScorecardViewState("options")
  );

  return (
    <DataTableRow bordered>
      <DataTableCell fixed left={"0"} width={"50px"} />
      {itemNumber && (
        <DataTableCell
          className={"extra-table-cell"}
          fixed
          left={"50px"}
          width={"50px"}
        />
      )}
      <DataTableCell
        fixed
        left={itemNumber ? "100px" : "50px"}
        className="scorecard-org-unit-cell"
      >
        <b>{i18n.t("Average")}</b>
      </DataTableCell>
      {dataHolders?.map(({ dataSources, id: holderId }) =>
        periods?.map(({ id }) => (
          <AverageDataContainer
            dataEngine={dataEngine}
            orgUnits={orgUnits}
            key={`${holderId}-${id}-average-cell`}
            dataSources={dataSources}
            period={id}
          />
        ))
      )}
      {averageColumn && <AverageCell bold value={overallAverage} />}
    </DataTableRow>
  );
}

AverageDataSourceRow.propTypes = {
  dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
  orgUnits: PropTypes.array.isRequired,
  overallAverage: PropTypes.number.isRequired,
};
