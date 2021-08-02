import PropTypes from "prop-types";
import React, { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ScorecardDataState } from "../../../../../../../core/state/scorecard";
import LinkedCellSvg from "../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import { generateRandomValues } from "../../../../../../../shared/utils/utils";
import { getLegend } from "../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";

export default function DataContainer({
  dataSources,
  orgUnitId,
  periodId,
  scorecardDataEngine,
}) {
  const data = useRecoilValue(ScorecardDataState);
  const [top, bottom] = dataSources ?? [];
  const topValue = useMemo(() => generateRandomValues(100), []);
  const topLegend = getLegend(topValue, top?.legends);

  useEffect(() => {
    //function
    // TODO Find best way to use data here to populate cells, @gift

    scorecardDataEngine
      .get("afJRQM05BYO_Zh23CLKw8xn_2020")
      .subscribe((data) => {
        console.log(data);
      });
  }, [orgUnitId, periodId, dataSources]);

  const bottomValue = useMemo(() => generateRandomValues(100), []);
  const bottomLegend = getLegend(bottomValue, bottom?.legends);

  return dataSources?.length > 1 ? (
    <LinkedCellSvg
      topValue={topValue}
      topColor={topLegend?.color}
      bottomValue={bottomValue}
      bottomColor={bottomLegend?.color}
    />
  ) : (
    <SingleCellSvg value={`${topValue}`} color={topLegend?.color} />
  );
}

DataContainer.propTypes = {
  dataSources: PropTypes.array,
  orgUnitId: PropTypes.string,
  periodId: PropTypes.string,
};
