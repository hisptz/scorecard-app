import {ScorecardOptionsForm} from "@scorecard/shared";
import React from "react";
import useOptionsManage from "./hooks/useOptionsManage";

export default function OptionsScorecardForm() {

    const {scorecardOptions, onChange, onAverageChange} = useOptionsManage();
    return (
        <div style={{height: '100%'}}>
            <ScorecardOptionsForm
                options={scorecardOptions}
                onChange={onChange}
                onAverageChange={onAverageChange}
            />
        </div>
    );
}
