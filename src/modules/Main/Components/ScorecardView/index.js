import {Button, ButtonStrip, colors} from '@dhis2/ui'
import React, {Suspense} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilValue, useResetRecoilState} from "recoil";
import ScorecardState, {ScorecardIdState} from "../../../../core/state/scorecard";
import {ReactComponent as UnderConstruction} from '../../../../resources/images/scorecard_under_construction.svg'
import {FullPageLoader} from "../../../../shared/Components/Loaders";

export default function ScorecardView() {
    const history = useHistory();
    const resetScorecardState = useResetRecoilState(ScorecardState)
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState)
    const {title, subtitle} = useRecoilValue(ScorecardState) ?? {}

    const onEdit = () => {
        history.push('/admin')
    }

    const onHome = () => {
        resetScorecardState();
        resetScorecardIdState();
        history.goBack()
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <div className='column p-32' style={{height: '100%', width: '100%'}}>
                <div className='row space-between'>
                    <div className='column'>
                        <h2>{title}</h2>
                        <p>{subtitle}</p>
                    </div>
                    <div className='column'>
                        <ButtonStrip end>
                            <Button onClick={onEdit}>Edit</Button>
                            <Button onClick={onHome}>Home</Button>
                        </ButtonStrip>
                    </div>
                </div>
                <div className='flex-1 column align-items-center center'>
                    <UnderConstruction style={{width: 400, height: 200}}/>
                    <p style={{color: colors.grey700, fontStyle: 'italic', fontSize: 20}}>This page is under
                        construction</p>
                </div>
            </div>
        </Suspense>
    )
}
