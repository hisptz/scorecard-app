import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, DropdownButton} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState,} from "recoil";
import {ScorecardDataEngine} from "@hisptz/scorecard-models";
import {
    RefreshScorecardState,
    RouterState,
    ScorecardIdState,
    ScorecardViewState,
    UserAuthorityOnScorecard
} from "@hisptz/scorecard-state";
import {ScorecardOptionsModal} from "shared/components/src/index";
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
    const onRefresh = useRecoilCallback(({set, reset}) => () => {
        reset(ScorecardViewState("orgUnitSelection"));
        reset(ScorecardViewState("periodSelection"));
        set(RefreshScorecardState, prevValue => prevValue + 1);
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