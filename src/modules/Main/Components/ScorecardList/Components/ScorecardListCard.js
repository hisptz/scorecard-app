import {useAlert} from "@dhis2/app-runtime";
import {useSavedObject} from "@dhis2/app-service-datastore";
import {Button, ButtonStrip, colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import ScorecardState, {ScorecardEditState} from "../../../../../core/state/scorecard";
import holderImage from '../../../../../resources/images/img.png'
import DeleteConfirmation from "../../../../../shared/Components/DeleteConfirmation";


export default function ScorecardListCard({scorecardId}) {
    const [scorecard, {remove}] = useSavedObject(scorecardId)
    const {title, subtitle, id} = scorecard
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const history = useHistory()
    const setScorecardState = useSetRecoilState(ScorecardState)
    const setScorecardEditState = useSetRecoilState(ScorecardEditState)
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    const onView = () => {
        setScorecardState(scorecard)
        history.push('/view')
    }

    const onEdit = () => {
        setScorecardState(scorecard)
        setScorecardEditState({scorecardId: id})
        history.push('/admin')
    }

    const onDelete = () => {
        remove()
        show({
            message: 'Scorecard deleted successfully',
            type: {success: true}
        })

    }

    return (
        <div className='container-bordered p-32' style={{margin: 16, textAlign: 'center', background: 'white'}}>
            <img alt='img' src={holderImage} style={{height: 100, width: 200}}/>
            <h3>{title}</h3>
            <p style={{color: colors.grey600}}>{subtitle}</p>
            <ButtonStrip middle>
                <Button onClick={onView} primary>View</Button>
                <Button onClick={onEdit}>Edit</Button>
                <Button onClick={() => setDeleteConfirmOpen(true)} destructive>Delete</Button>
            </ButtonStrip>
            {
                deleteConfirmOpen &&
                <DeleteConfirmation component={<p>Are you sure you want to delete scorecard <b>{title}</b></p>} onConfirm={onDelete}
                                    onCancel={() => setDeleteConfirmOpen(false)}/>
            }
        </div>
    )
}

ScorecardListCard.propTypes = {
    scorecardId: PropTypes.string
};

