import React from "react";
import {ACCESS_HELP_STEPS} from "../../../../../../../../../shared/constants/src/help/scorecardManagement";
import Help from "../Help";
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
