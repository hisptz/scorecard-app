import {Button, ButtonStrip} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import ScorecardState, {ScorecardEditState} from "../../../../../core/state/scorecard";
import {ReactComponent as ScorecardIllustration} from '../../../../../resources/images/scorecards_illustration.svg'


export default function ScorecardListCard({scorecard}) {
    const {title, subtitle, id} = scorecard
    const history = useHistory()
    const setScorecardState = useSetRecoilState(ScorecardState)
    const setScorecardEditState = useSetRecoilState(ScorecardEditState)

    const onView = () => {

    }

    const onEdit = () => {
        setScorecardState(scorecard)
        setScorecardEditState({scorecardId: id})
        history.replace('/admin')
    }

    const onDelete = () => {

    }

    return (
        <div className='container-bordered p-16' style={{margin: 16, textAlign: 'center'}}>
            <ScorecardIllustration style={{height: 100, width: 200}}/>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <ButtonStrip middle>
                <Button primary>View</Button>
                <Button onClick={onEdit}>Edit</Button>
                <Button destructive>Delete</Button>
            </ButtonStrip>
        </div>
    )
}

ScorecardListCard.propTypes = {
    scorecard: PropTypes.object
};

