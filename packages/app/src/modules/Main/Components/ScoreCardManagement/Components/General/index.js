import {Help} from "@scorecard/shared"
import {GENERAL_HELP_STEPS} from "@scorecard/shared";
import React from "react";
import GeneralForm from "./Components/GeneralForm";

export default function GeneralScorecardForm() {
    return (
        <div className="container">
            <Help helpSteps={GENERAL_HELP_STEPS}/>
            <div className="column space-between">
                <GeneralForm/>
            </div>
        </div>
    );
}
