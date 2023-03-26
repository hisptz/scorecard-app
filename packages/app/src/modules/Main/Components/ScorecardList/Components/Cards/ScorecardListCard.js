import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, colors} from "@dhis2/ui";
import {useConfirmDialog} from "@hisptz/dhis2-ui";
import {
    RouterState,
    ScorecardCardImage as holderImage,
    truncateDescription,
    useDeleteScorecard,
    UserAuthorityOnScorecard
} from "@scorecard/shared";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";


export default function ScorecardListCard({scorecard, grid}) {
    const setRoute = useSetRecoilState(RouterState);
    const {write, delete: deletePermission} = useRecoilValue(
        UserAuthorityOnScorecard(scorecard?.id)
    );
    const {title, description, id} = scorecard;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const history = useHistory();
    const {remove} = useDeleteScorecard(id);
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );

    const {confirm} = useConfirmDialog();

    const onView = () => {
        setRoute((prevRoute) => ({...prevRoute, previous: `/`}));
        history.push(`/view/${id}`);
    };

    const onEdit = () => {
        if (write) {
            setRoute((prevRoute) => ({...prevRoute, previous: `/`}));
            history.push(`/edit/${id}`);
        }
    };

    const deleteScorecard = async () => {
        if (deletePermission) {
            try {
                await remove();
            } catch (e) {
                show({
                    message: e.message,
                    type: {info: true},
                });
            }
            show({
                message: i18n.t("Scorecard deleted successfully"),
                type: {success: true},
            });
        }
    };

    const onDelete = (value, event) => {
        event.stopPropagation();
        confirm({
            title: i18n.t("Confirm scorecard delete"),
            message: <p>
                {i18n.t("Are you sure you want to delete scorecard ")}:
                <b>{title}</b>
            </p>,
            onCancel: () => {

            },
            onConfirm: () => {
                deleteScorecard();
            }
        })
    }

    return grid ? (
        <div
            className="container-bordered p-16 "
            data-test="scorecard-thumbnail-view"
            style={{margin: 16, background: "white"}}
            onClick={onView}
        >
            <div className="column space-between h-100">
                <div className="text-center p-8">
                    <img
                        alt="img"
                        src={holderImage}
                        style={{height: 100, width: 200}}
                    />
                </div>
                <div className="flex-1 column align-items-center">
                    <h4 className="scorecard-list-card-title">{title}</h4>
                    <p
                        className="scorecard-list-card-description"
                        style={{color: colors.grey700}}
                    >
                        {description?.length > 100 ? (
                            <div
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowFullDescription((prevState) => !prevState);
                                }}
                                className="row space-between align-content-end"
                            >
                                {showFullDescription
                                    ? description
                                    : truncateDescription(description)}
                            </div>
                        ) : (
                            description
                        )}
                    </p>
                </div>
                <div style={{margin: "0 8px"}}>
                    <ButtonStrip middle>
                        <Button onClick={onView}>{i18n.t("View")}</Button>
                        {write && (
                            <Button
                                dataTest={"edit-scorecard-button"}
                                onClick={function (_, e) {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                            >
                                {i18n.t("Edit")}
                            </Button>
                        )}
                        {deletePermission && (
                            <Button
                                dataTest="scorecard-delete-button"
                                onClick={onDelete}
                            >
                                {i18n.t("Delete")}
                            </Button>
                        )}
                    </ButtonStrip>
                </div>
            </div>
        </div>
    ) : (
        <div
            data-test="scorecard-thumbnail-view"
            className="container-bordered p-32"
            style={{margin: 16, background: "white"}}
            onClick={onView}
        >
            <div className="row space-between align-items-center">
                <div className="row align-items-center">
                    <div>
                        <img
                            alt="img"
                            src={holderImage}
                            style={{height: 100, width: 200}}
                        />
                    </div>
                    <div className="column start">
                        <h4 className="scorecard-list-card-title">{title}</h4>
                        <p
                            className="scorecard-list-card-description"
                            style={{color: colors.grey700}}
                        >
                            {description?.length > 100 ? (
                                <div
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setShowFullDescription((prevState) => !prevState);
                                    }}
                                    className="row space-between align-content-end"
                                >
                                    {showFullDescription
                                        ? description
                                        : truncateDescription(description)}
                                </div>
                            ) : (
                                description
                            )}
                        </p>
                    </div>
                </div>
                <div className="row end">
                    <ButtonStrip middle>
                        <Button onClick={onView}>{i18n.t("View")}</Button>
                        {write && (
                            <Button
                                dataTest={"edit-scorecard-button"}
                                onClick={function (_, e) {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                            >
                                {i18n.t("Edit")}
                            </Button>
                        )}
                        {deletePermission && (
                            <Button
                                dataTest="scorecard-delete-button"
                                onClick={onDelete}
                            >
                                {i18n.t("Delete")}
                            </Button>
                        )}
                    </ButtonStrip>
                </div>
            </div>
        </div>
    );
}

ScorecardListCard.propTypes = {
    grid: PropTypes.bool.isRequired,
    scorecard: PropTypes.object,
};
