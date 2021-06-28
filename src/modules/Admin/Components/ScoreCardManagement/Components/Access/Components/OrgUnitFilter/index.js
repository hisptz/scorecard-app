import React from 'react'
import {useRecoilState} from "recoil";
import {ScorecardStateSelector} from "../../../../../../../../core/state/scorecard";
import OrgUnitFilter from "../../../../../../../../shared/Components/OrgUnitFilter";


export default function OrgUnit() {
    const [organisationUnit, setOrganisationUnit] = useRecoilState(ScorecardStateSelector('organisationUnit'))
    return (
        <div className='column'>
            <div className='pt-16 pb-16'><h3>Organisation Unit</h3></div>
            <OrgUnitFilter onUpdate={setOrganisationUnit} value={organisationUnit}/>
        </div>
    )
}
