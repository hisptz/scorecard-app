import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, DropdownButton} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState,} from "recoil";
import ScorecardDataEngine from "../../../../../core/models/scorecardData";
import RouterState from "../../../../../core/state/router";
import {ScorecardIdState, ScorecardRequestId, ScorecardViewState,} from "../../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../../core/state/user";
import ScorecardOptionsModal from "../../../../../shared/Components/ScorecardOptionsModal";
import DownloadMenu from "./Download/Components/DownloadMenu";
import useDownload from "./ScorecardViewHeader/hooks/useDownload";

export default function ScorecardActions({downloadAreaRef, dataEngine}) {
    const setRoute = useSetRecoilState(RouterState);
    const [scorecardOptions, setScorecardOptions] = useRecoilState(
        ScorecardViewState("options")
    );
    const [optionsOpen, setOptionsOpen] = useState(false);
    const {download: onDownload} = useDownload(downloadAreaRef, dataEngine);
    const scorecardId = useRecoilValue(ScorecardIdState);
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId));
    const writeAccess = userAuthority?.write;
    const history = useHistory();

    const onRefresh = useRecoilCallback(({reset, set}) => () => {
        set(ScorecardRequestId(scorecardId), prevValue => prevValue + 1)
        reset(ScorecardViewState(scorecardId))
    });

    const onEdit = () => {
        if (writeAccess) {
            setRoute((prevRoute) => ({
                ...prevRoute,
                previous: `/view/${scorecardId}`,
            }));
            history.push(`/edit/${scorecardId}`);
        }
    };

    return (
        <div className="row end print-hide">
            <div className="column align-items-end">
                <ButtonStrip>
                    <Button
                        className="option-button"
                        dataTest={"scorecard-option-button"}
                        onClick={() => setOptionsOpen(true)}
                    >
                        {i18n.t("Options")}
                    </Button>
                    {writeAccess && (
                        <Button
                            dataTest={"edit-scorecard-button"}
                            className="scorecard-view-edit-button"
                            onClick={onEdit}
                        >
                            {i18n.t("Edit")}
                        </Button>
                    )}
                    <DropdownButton
                        component={
                            <DownloadMenu onClose={() => {
                            }} onDownload={onDownload}/>
                        }
                        className="download-button"
                        dataTest={"download-button"}
                    >
                        {i18n.t("Download")}
                    </DropdownButton>

                    <Button className="refresh-button" onClick={onRefresh}>
                        {i18n.t("Refresh")}
                    </Button>
                </ButtonStrip>
            </div>

            {optionsOpen && (
                <ScorecardOptionsModal
                    onClose={() => setOptionsOpen(false)}
                    initialValues={scorecardOptions}
                    onSelect={setScorecardOptions}
                />
            )}
        </div>
    );
}

ScorecardActions.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    downloadAreaRef: PropTypes.any.isRequired,
};
