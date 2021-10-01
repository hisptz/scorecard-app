import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { OrgUnitLevels } from "../../../../../../../../../core/state/orgUnit";
import { ScorecardConfigDirtyState } from "../../../../../../../../../core/state/scorecard";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {
  generateRandomValues,
  getLegend,
} from "../../../../../../../../../shared/utils/utils";
import CustomLinkedCell from "./CustomLinkedCell";

export default function PreviewCustomCell({ config }) {
  const orgUnitLevels = useRecoilValue(OrgUnitLevels);
  const legendDefinitions = useRecoilValue(
    ScorecardConfigDirtyState("legendDefinitions")
  );
  const hasLinked = config?.dataSources?.length > 1;
  const [top, bottom] = config?.dataSources ?? [];
  const { legends, showColors, id, displayArrows, weight } = top ?? {};
  const value = useMemo(generateRandomValues, []);
  const legend = getLegend(value, legends, {
    max: weight,
    orgUnitLevels,
    dataOrgUnitLevel: 1,
    legendDefinitions,
  });

  return hasLinked ? (
    <CustomLinkedCell bottom={bottom} top={top} />
  ) : (
    <td
      width={"100px"}
      className="data-cell"
      align="center"
      key={`${id}-data`}
      id={id}
    >
      <SingleCellSvg
        status={displayArrows && "decreasing"}
        color={showColors ? legend?.color : undefined}
        value={value}
      />
    </td>
  );
}

PreviewCustomCell.propTypes = {
  config: PropTypes.object.isRequired,
};
