import {Button, ButtonStrip, colors} from '@dhis2/ui'
import React from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import ScorecardState, {ScorecardEditState} from "../../../../core/state/scorecard";
import {ReactComponent as UnderConstruction} from '../../../../resources/images/scorecard_under_construction.svg'

export default function ScorecardView() {
    const history = useHistory();
    const setEditState = useSetRecoilState(ScorecardEditState)
    const {title, subtitle, id} = useRecoilValue(ScorecardState) ?? {}

    const onEdit = () => {
        setEditState({scorecardId: id})
        history.replace('/admin')
    }

    const onHome = () => {
        history.replace('/home')
    }


    return (
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
                <p style={{color: colors.grey700, fontStyle: 'italic', fontSize: 20}}>This page is under construction</p>
            </div>
        </div>

    )
}
