import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, DropdownButton} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import ScorecardDataEngine from "../../../../../core/models/scorecardData";
import ScorecardConfState, {
    ScorecardIdState,
    ScorecardRequestId,
    ScorecardViewState
} from "../../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../../core/state/user";
import ScorecardOptionsModal from "../../../../../shared/Components/ScorecardOptionsModal";
import DownloadMenu from "./Download/Components/DownloadMenu";
import useDownload from "./ScorecardViewHeader/hooks/useDownload";


export default function ScorecardActions({downloadAreaRef, dataEngine}) {
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardViewState('options'))
    const [optionsOpen, setOptionsOpen] = useState(false);
    const {download: onDownload} = useDownload(downloadAreaRef, dataEngine);
    const scorecardId = useRecoilValue(ScorecardIdState)
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const writeAccess = userAuthority?.write;

    const onRefresh = useRecoilCallback(({reset, set}) => () => {
        reset(ScorecardConfState(scorecardId))
        set(ScorecardRequestId(scorecardId), prevValue => prevValue + 1)
    })


    const onEdit = () => {
        if (writeAccess) {
            history.push(`/edit/${scorecardId}`)
        }
    }


    return (
        <div className='row end'>
            <div className='column align-items-end'>
                <ButtonStrip>
                    <Button className="option-button" onClick={() => setOptionsOpen(true)}>{i18n.t('Options')}</Button>
                    {writeAccess && <Button dataTest={"test-edit-scorecard"} className="scorecard-view-edit-button"
                                            onClick={onEdit}>{i18n.t("Edit")}</Button>}
                    <DropdownButton
                        component={<DownloadMenu onClose={() => {
                        }}
                                                 onDownload={onDownload}/>}
                        className="download-button"
                    >
                        {i18n.t("Download")}
                    </DropdownButton>

                    <Button className="refresh-button" onClick={onRefresh}>{i18n.t('Refresh')}</Button>
                </ButtonStrip>
            </div>

            {
                optionsOpen &&
                <ScorecardOptionsModal onClose={() => setOptionsOpen(false)} initialValues={scorecardOptions}
                                       onSelect={setScorecardOptions}/>
            }

        </div>
    )
}

ScorecardActions.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    downloadAreaRef: PropTypes.any.isRequired
};
