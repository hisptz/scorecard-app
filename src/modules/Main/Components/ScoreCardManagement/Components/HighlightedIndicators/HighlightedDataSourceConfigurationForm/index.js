import { debounce, filter } from "lodash";
import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { INDICATOR_CONFIGURATION_STEPS } from "../../../../../../../core/constants/help/scorecardManagement";
import {
  ScorecardConfigDirtySelector,
  ScorecardConfigDirtyState,
  ScorecardConfigEditState,
} from "../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm from "../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";
import Help from "../../Help";

export default function HighlightedDataSourceConfigurationForm() {
  const { selectedHighlightedIndicatorIndex } = useRecoilValue(
    ScorecardConfigEditState
  );
  const [selectedHighlightedIndicator, setSelectedHighlightedIndicator] =
    useRecoilState(
      ScorecardConfigDirtySelector({
        path: [selectedHighlightedIndicatorIndex],
        key: "highlightedIndicators",
      })
    );
  const legendDefinitions = useRecoilValue(
    ScorecardConfigDirtyState("legendDefinitions")
  );
  const filteredLegendDefinitions = useMemo(
    () => filter(legendDefinitions, ({ isDefault }) => !isDefault),
    [legendDefinitions]
  );

  const onChange = debounce(({ values, dirty }) => {
    if (dirty) {
      setSelectedHighlightedIndicator((prevState) => ({
        ...prevState,
        ...values,
      }));
    }
  });

  return !isNaN(selectedHighlightedIndicatorIndex) ? (
    <div className="container-bordered">
      <Help helpSteps={INDICATOR_CONFIGURATION_STEPS} />
      {selectedHighlightedIndicator && (
        <DataSourceConfigurationForm
          defaultValues={selectedHighlightedIndicator}
          legendDefinitions={filteredLegendDefinitions}
          onFormChange={onChange}
        />
      )}
    </div>
  ) : null;
}
