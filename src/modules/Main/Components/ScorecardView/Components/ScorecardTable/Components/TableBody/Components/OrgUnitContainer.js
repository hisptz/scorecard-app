import PropTypes from "prop-types";
import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { DraggableItems } from "../../../../../../../../../core/constants/draggables";
import { OrgUnitPathState } from "../../../../../../../../../core/state/orgUnit";
import { ScorecardViewState } from "../../../../../../../../../core/state/scorecard";
import DraggableCell from "./DraggableCell";

export default function OrgUnitContainer({ orgUnit }) {
  const pathNamesState = useRecoilValueLoadable(
    OrgUnitPathState(orgUnit?.path)
  );
  const { showHierarchy } = useRecoilValue(ScorecardViewState("options"));

  return (
    <DraggableCell
      label={
        showHierarchy
          ? pathNamesState?.state === "hasValue"
            ? pathNamesState?.contents
            : "Loading..."
          : orgUnit?.displayName
      }
      type={DraggableItems.ORG_UNIT_ROW}
      style={{ textAlign: "start" }}
    />
  );
}

OrgUnitContainer.propTypes = {
  orgUnit: PropTypes.object.isRequired,
};
