import React from 'react'
import {ACCESS_HELP_STEPS} from "../../../../../../core/constants/help/scorecardManagement";
import Help from "../Help";
import OrgUnit from "./Components/OrgUnitFilter";
import Sharing from "./Components/Sharing";


export default function AccessScorecardForm() {

    return (
        <div className='container p-16'>
            <Help helpSteps={ACCESS_HELP_STEPS}/>
            <div className='row'>
                <div className='column'>
                    <OrgUnit/>
                </div>
                <div className='column'>
                    <Sharing/>
                </div>
            </div>
        </div>
    )
}
