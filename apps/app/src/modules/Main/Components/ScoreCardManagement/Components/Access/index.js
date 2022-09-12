import {Help} from "@hisptz/scorecard-components"
import {ACCESS_HELP_STEPS} from "@hisptz/scorecard-constants";
import React from "react";
import OrgUnit from "./Components/OrgUnitFilter";
import Sharing from "./Components/Sharing";

export default function AccessScorecardForm() {
    return (
        <div style={{minHeight: '70vh', height: '100%'}} className="container p-16">
            <Help helpSteps={ACCESS_HELP_STEPS}/>
            <div className="row">
                <div className="column">
                    <OrgUnit/>
                </div>
                <div className="column">
                    <Sharing/>
                </div>
            </div>
        </div>
    );
}
