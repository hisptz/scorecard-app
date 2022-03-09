import React from "react";
import {useRecoilValue} from "recoil";
import DataSourceConfigurationForm
    from "../../../../../../../../../../shared/components/src/CustomForm/components/DataSourceConfigurationForm";
import {
    INDICATOR_CONFIGURATION_STEPS
} from "../../../../../../../../../../shared/constants/src/help/scorecardManagement";
import {ScorecardConfigEditState,} from "../../../../../../../../../../shared/state/src/scorecard";
import Help from "../../Help";

export default function HighlightedDataSourceConfigurationForm() {
    const {selectedHighlightedIndicatorIndex} = useRecoilValue(
        ScorecardConfigEditState
    ) ?? {};

    const path = `highlightedIndicators.${selectedHighlightedIndicatorIndex}`

    return !isNaN(selectedHighlightedIndicatorIndex) ? (
        <div className="container-bordered">
            <Help helpSteps={INDICATOR_CONFIGURATION_STEPS}/>
            <DataSourceConfigurationForm path={path}/>
        </div>
    ) : null;
}
