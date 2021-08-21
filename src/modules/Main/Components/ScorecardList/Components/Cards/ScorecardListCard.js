import {useAlert} from "@dhis2/app-runtime";
import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {UserAuthorityOnScorecard} from "../../../../../../core/state/user";
import holderImage from '../../../../../../resources/images/img.png'
import DeleteConfirmation from "../../../../../../shared/Components/DeleteConfirmation";
import {useDeleteScorecard} from "../../../../../../shared/hooks/datastore/useScorecard";
import useCardDetails from "./hooks/useCardDetails";
import {onDelete, onEdit, onView} from "./services/callbacks";

export default function ScorecardListCard({scorecard}) {
    const {
        id,
        remove,
        readAccess,
        writeAccess,
        show,
        history,
        deleteAccess,
        setDeleteConfirmOpen,
        title,
        description,
        deleteConfirmOpen,
    } = useCardDetails(scorecard)

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
                        {
                            readAccess && <Button onClick={onView(history, readAccess, id)} primary>
                                {i18n.t("View")}
                            </Button>
                        }{
                        writeAccess && <Button onClick={onEdit(history, writeAccess, id)}>{i18n.t("Edit")}</Button>

                    }
                        {
                            deleteAccess && <Button onClick={() => setDeleteConfirmOpen(true)} destructive>
                                {i18n.t("Delete")}
                            </Button>
                        }
                    </ButtonStrip>
                    {
                        deleteConfirmOpen &&
                        <DeleteConfirmation
                            component={
                                <p>
                                    {i18n.t("Are you sure you want to delete scorecard")}:
                                    <b>{title}</b>
                                </p>
                            }
                            onConfirm={onDelete({deleteAccess, remove, show, setDeleteConfirmOpen})}
                            onCancel={() => setDeleteConfirmOpen(false)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

ScorecardListCard.propTypes = {
    scorecard: PropTypes.object
};

