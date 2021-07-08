import {Button, ButtonStrip} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import ScorecardState, {ScorecardEditState} from "../../../../../core/state/scorecard";
import holderImage from '../../../../../resources/images/img.png'


export default function ScorecardListCard({scorecard}) {
    const {title, subtitle, id} = scorecard
    const history = useHistory()
    const setScorecardState = useSetRecoilState(ScorecardState)
    const setScorecardEditState = useSetRecoilState(ScorecardEditState)

    const onView = () => {
        setScorecardState(scorecard)
        history.replace('/view')
    }

    const onEdit = () => {
        setScorecardState(scorecard)
        setScorecardEditState({scorecardId: id})
        history.replace('/admin')
    }

    const onDelete = () => {

    }

    return (
        <div className='container-bordered p-32' style={{margin: 16, textAlign: 'center', background: 'white'}}>
            <img alt='img' src={holderImage} style={{height: 100, width: 200}}/>
            <h3>{title}</h3>
            <p  >{subtitle}</p>
            <ButtonStrip middle>
                <Button onClick={onView} primary>View</Button>
                <Button onClick={onEdit}>Edit</Button>
                <Button destructive>Delete</Button>
            </ButtonStrip>
        </div>
    )
}

ScorecardListCard.propTypes = {
    scorecard: PropTypes.object
};

