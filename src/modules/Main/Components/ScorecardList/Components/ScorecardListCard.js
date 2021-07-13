import {useAlert} from "@dhis2/app-runtime";
import {Button, ButtonStrip, colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {ScorecardIdState} from "../../../../../core/state/scorecard";
import holderImage from '../../../../../resources/images/img.png'
import DeleteConfirmation from "../../../../../shared/Components/DeleteConfirmation";
import {useDeleteScorecard} from "../../../../../shared/hooks/datastore/useScorecard";


export default function ScorecardListCard({scorecard}) {
    const {title, description, id} = scorecard


    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const history = useHistory()
    const {remove} = useDeleteScorecard(id)
    const setScorecardIdState = useSetRecoilState(ScorecardIdState)
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    const onView = () => {
        setScorecardIdState(id)
        history.push('/view', {from: 'home'})
    }

    const onEdit = () => {
        setScorecardIdState(id)
        history.push('/admin', {from: 'home'})
    }

    const onDelete = async () => {
        try{
           await remove()
        } catch (e){
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
        <div className='container-bordered p-32' style={{margin: 16, background: 'white'}}>
            <div className='row space-between align-items-center'>
                <div className='row'>
                    <img alt='img' src={holderImage} style={{height: 100, width: 200, paddingRight: 32}}/>
                   <div className='column start'>
                       <h3>{title}</h3>
                       <p style={{color: colors.grey600, margin: 0}}>{description}</p>
                   </div>
                </div>
                <div className='row end'>
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
            </div>
        </div>
    )
}

ScorecardListCard.propTypes = {
    scorecard: PropTypes.object
};

