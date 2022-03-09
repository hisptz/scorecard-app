import {DataSourceConfigurationForm} from "@hisptz/scorecard-components";
import {INDICATOR_CONFIGURATION_STEPS} from "@hisptz/scorecard-constants";
import {ScorecardConfigEditState,} from "@hisptz/scorecard-state";
import React from "react";
import {useRecoilValue} from "recoil";
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
