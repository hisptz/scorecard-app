import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, colors} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {EngineState, RouterState, ScorecardCardImage as holderImage, truncateDescription} from "@scorecard/shared";
import {scorecardWidgetState} from "../../../../../../states/scorecard"
import {createWidget} from "../../../../../../services/widget";
import {useConfirmDialog} from "@hisptz/dhis2-ui";

export default function ScorecardListCard({scorecard, grid}) {
    const setRoute = useSetRecoilState(RouterState);
    const useCurrentDashboardIdState = useRecoilValue(scorecardWidgetState);
    const engineState = useRecoilValue(EngineState);
    const {title, description, id} = scorecard;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const history = useHistory();
    const {confirm} = useConfirmDialog();

    const onView = () => {
        setRoute((prevRoute) => ({...prevRoute, previous: `/`}));
        history.push(`/view/${id}`);
    };

    const onSelect = () => {
        confirm({
            title: i18n.t("Confirm scorecard selection"),
            message: i18n.t("Are you sure you want to select this scorecard for this dashboard?"),
            onConfirm: () => {
                onCreateWidget();
            },
            confirmButtonColor: "primary"
        })
    }

    const onCreateWidget = async () => {
        let scoreCardWidget = {
            dashboardId: useCurrentDashboardIdState,
            scorecardId: id,
            periodType: "",
            period: "",
            organisation_unit: "",
        };

        return await createWidget(scoreCardWidget, useCurrentDashboardIdState, engineState).then((response) => {
            if (response['widget']['httpStatusCode'] >= 200 && response['widget']['httpStatusCode'] <= 205) {
                return onView();
            } else {
                return window.reload()
            }
        })
    }

    return grid ? (
        <div
            className="container-bordered p-16 "
            data-test="scorecard-thumbnail-view"
            style={{margin: 16, background: "white"}}
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
                        <Button
                            dataTest="scorecard-select-button"
                            onClick={function (_, e) {
                                e.stopPropagation();
                                onSelect();
                            }}
                        >
                            {i18n.t("Select")}
                        </Button>
                    </ButtonStrip>
                </div>
            </div>
        </div>
    ) : (
        <div
            data-test="scorecard-thumbnail-view"
            className="container-bordered p-32"
            style={{margin: 16, background: "white"}}
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
                        <Button
                            dataTest="scorecard-delete-button"
                            onClick={function (_, e) {
                                e.stopPropagation();
                                onSelect();
                            }}
                        >
                            {i18n.t("Select")}
                        </Button>
                    </ButtonStrip>
                </div>
            </div>
        </div>
    );
}

ScorecardListCard.propTypes = {
    grid: PropTypes.bool,
    scorecard: PropTypes.object,
};
