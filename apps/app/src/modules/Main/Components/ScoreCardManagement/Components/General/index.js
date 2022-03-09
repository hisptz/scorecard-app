import {GENERAL_HELP_STEPS} from "@hisptz/scorecard-constants";
import React from "react";
import Help from "../Help";
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
