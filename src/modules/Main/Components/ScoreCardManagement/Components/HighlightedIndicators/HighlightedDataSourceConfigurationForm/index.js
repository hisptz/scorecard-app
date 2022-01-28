import React from "react";
import {useRecoilValue} from "recoil";
import {INDICATOR_CONFIGURATION_STEPS} from "../../../../../../../core/constants/help/scorecardManagement";
import {ScorecardConfigEditState,} from "../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";
import Help from "../../Help";

export default function HighlightedDataSourceConfigurationForm() {
    const {selectedHighlightedIndicatorIndex} = useRecoilValue(
        ScorecardConfigEditState
    ) ?? {};

    const path = `highlightedIndicators.${selectedHighlightedIndicatorIndex}`

    return !isNaN(selectedHighlightedIndicatorIndex) ? (
        <div className="container-bordered">
            <Help helpSteps={INDICATOR_CONFIGURATION_STEPS}/>
            <DataSourceConfigurationForm path={path} />
        </div>
    ) : null;
}
