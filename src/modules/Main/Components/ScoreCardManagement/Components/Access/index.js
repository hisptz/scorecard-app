import React from 'react'
import OrgUnit from "./Components/OrgUnitFilter";
import Sharing from "./Components/Sharing";


export default function AccessScorecardForm() {

    return (
        <div className='container p-16'>
            <div className='row'>
                <div className='column'>
                    <OrgUnit  />
                </div>
                <div className='column'>
                    <Sharing/>
                </div>
            </div>
        </div>
    )
}
