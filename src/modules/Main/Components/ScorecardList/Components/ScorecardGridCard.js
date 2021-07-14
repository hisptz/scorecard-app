import {useAlert} from "@dhis2/app-runtime";
import {Button, ButtonStrip, colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import holderImage from '../../../../../resources/images/img.png'
import DeleteConfirmation from "../../../../../shared/Components/DeleteConfirmation";
import {useDeleteScorecard} from "../../../../../shared/hooks/datastore/useScorecard";


export default function ScorecardGridCard({scorecard}) {
    const {title, description, id} = scorecard;
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const history = useHistory()
    const {remove} = useDeleteScorecard(id)
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    const onView = () => {
        history.push(`/view/${id}`, {from: 'home'})
    }

    const onEdit = () => {
        history.push(`/edit/${id}`, {from: 'home'})
    }

    const onDelete = async () => {
        try {
            await remove()
        } catch (e) {
            show({
                message: e.message,
                type: {info: true}
            })
        }
        show({
            message: 'Scorecard deleted successfully',
            type: {success: true}
        })

    }

    return (
        <div className='container-bordered p-32' style={{margin: 16, textAlign: 'center', background: 'white'}}>
            <img alt='img' src={holderImage} style={{height: 100, width: 200}}/>
            <h3>{title}</h3>
            <p style={{color: colors.grey600}}>{description}</p>
            <ButtonStrip middle>
                <Button onClick={onView} primary>View</Button>
                <Button onClick={onEdit}>Edit</Button>
                <Button onClick={() => setDeleteConfirmOpen(true)} destructive>Delete</Button>
            </ButtonStrip>
            {
                deleteConfirmOpen &&
                <DeleteConfirmation component={<p>Are you sure you want to delete scorecard <b>{title}</b></p>}
                                    onConfirm={onDelete}
                                    onCancel={() => setDeleteConfirmOpen(false)}/>
            }
        </div>
    )
}

ScorecardGridCard.propTypes = {
    scorecard: PropTypes.object
};

