import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, colors} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import holderImage from "../../../../../../resources/images/img.png";
import DeleteConfirmation from "../../../../../../shared/Components/DeleteConfirmation";
import {useDeleteScorecard} from "../../../../../../shared/hooks/datastore/useScorecard";
import {truncateDescription} from "../../../../../../shared/utils/utils";

export default function ScorecardGridCard({scorecard}) {
    const {title, description, id} = scorecard;
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const history = useHistory();
    const {remove, error: deleteError} = useDeleteScorecard(id);
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );

    const onView = () => {
        history.push(`/view/${id}`, {from: "home"});
    };

    const onEdit = () => {
        history.push(`/edit/${id}`, {from: "home"});
    };

    const onDelete = async () => {
        try {
            await remove();
        } catch (e) {
            show({
                message: e.message,
                type: {info: true},
            });
        }
        setDeleteConfirmOpen(false);
        show({
            message: i18n.t("Scorecard deleted successfully"),
            type: {success: true},
        });
    };

    useEffect(() => {
        if (deleteError) {
            show({
                message: deleteError?.message ?? deleteError.toString(),
                type: {info: true},
            });
        }
    }, [deleteError]);

    return (
        <div
            className="container-bordered p-16 "
            style={{margin: 16, background: "white"}}
            onClick={onView}
        >
            <div className="column space-between h-100">
                <div className='text-center p-8'>
                    <img alt="img" src={holderImage} style={{height: 100, width: 200}}/>
                </div>
                <div className="flex-1">
                    <h4 className='scorecard-list-card-title'>{title}</h4>
                    <p className="scorecard-list-card-description"
                       style={{color: colors.grey700}}>
                        {
                            description?.length > 100 ?
                                <div onClick={(event) => {
                                    event.stopPropagation()
                                    setShowFullDescription(prevState => !prevState)
                                }} className='row space-between align-content-end'>
                                    {showFullDescription ? description : truncateDescription(description)}
                                </div> :
                                description
                        }
                    </p>

                </div>
                <div style={{margin: '0 8px'}}>
                    <ButtonStrip start>
                        <Button onClick={onView}>
                            {i18n.t("View")}
                        </Button>
                        <Button onClick={(_, e) => {
                            e.stopPropagation()
                            onEdit()
                        }}>{i18n.t("Edit")}</Button>
                        <Button onClick={(_, e) => {
                            e.stopPropagation()
                            setDeleteConfirmOpen(true)
                        }}>
                            {i18n.t("Delete")}
                        </Button>
                    </ButtonStrip>
                </div>
                {deleteConfirmOpen && (
                    <DeleteConfirmation
                        component={
                            <p>
                                {i18n.t("Are you sure you want to delete scorecard ")}:
                                <b>{title}</b>
                            </p>
                        }
                        onConfirm={function (_, e) {
                            e.stopPropagation()
                            onDelete()
                        }}
                        onCancel={function (_, e) {
                            e.stopPropagation()
                            setDeleteConfirmOpen(false)
                        }}
                    />
                )}
            </div>
        </div>
    );
}

ScorecardGridCard.propTypes = {
    scorecard: PropTypes.object,
};
