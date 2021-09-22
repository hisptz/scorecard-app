import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, colors,DropdownButton} from '@dhis2/ui'
import PropTypes from "prop-types";
import React, {useRef, useState} from 'react'
import JsxParser from 'react-jsx-parser'
import {useHistory} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import ScorecardDataEngine from "../../../../../../core/models/scorecardData";
import {ScorecardConfigDirtyState, ScorecardIdState, ScorecardViewState} from "../../../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../../../core/state/user";
import ScorecardOptionsModal from "../../../../../../shared/Components/ScorecardOptionsModal";
import DownloadMenu from "../Download/Components/DownloadMenu";
import useDownload from "../ScorecardViewHeader/hooks/useDownload";


export default function ScorecardHeader({downloadAreaRef, dataEngine}) {
    const {title: showTitle} = useRecoilValue(ScorecardViewState('options'))
    const customHeader = useRecoilValue(ScorecardConfigDirtyState('customHeader'))
    const title = useRecoilValue(ScorecardConfigDirtyState('title'))
    const subtitle = useRecoilValue(ScorecardConfigDirtyState('subtitle'))

    const history = useHistory();
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardViewState('options'))
    const scorecardId = useRecoilValue(ScorecardIdState)
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const writeAccess = userAuthority?.write;
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const {download: onDownload} = useDownload(downloadAreaRef, dataEngine);
    const onRefresh = () => {
        window.location.reload(true)
    }
    const onEdit = () => {
        if (writeAccess) {
            history.push(`/edit/${scorecardId}`)
        }
    }


    const downloadRef = useRef()

    return (
        showTitle ? <div className='row space-between' id={"scorecard-header"}>
            <div className='row'>
                {
                    customHeader ? <JsxParser
                        autoCloseVoidElements
                        onError={console.log}
                        bindings={{
                            title,
                            subtitle
                        }} jsx={customHeader}
                    /> : <div className='column center align-items-center'>
                        <h1 style={{margin: 8}} id={'data-test-score-card-title'}>{title}</h1>
                        <h3 style={{color: colors.grey600, margin: 0}}>{subtitle}</h3>
                    </div>
                }

            </div>
            <div className='column align-items-end' >
                <ButtonStrip>
                    <Button className="option-button" onClick={() => setOptionsOpen(true)}>{i18n.t('Options')}</Button>
                    {writeAccess && <Button dataTest={"test-edit-scorecard"} className="scorecard-view-edit-button" onClick={onEdit}>{i18n.t("Edit")}</Button>}
                    <DropdownButton className="download-button"  onClick={() => setDownloadOpen(true)}>
                        <div ref={downloadRef}>{i18n.t("Download")}</div>
                    </DropdownButton>
                    {downloadOpen &&
                    <DownloadMenu reference={downloadRef} onClose={() => setDownloadOpen(false)}
                                  onDownload={onDownload}/>}
                    <Button className="refresh-button" onClick={onRefresh}>{i18n.t('Refresh')}</Button>
                </ButtonStrip>
            </div>

            {
                optionsOpen &&
                <ScorecardOptionsModal onClose={() => setOptionsOpen(false)} initialValues={scorecardOptions}
                                       onSelect={setScorecardOptions}/>
            }

        </div> : null
    )
}


ScorecardHeader.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    downloadAreaRef: PropTypes.any.isRequired
};
