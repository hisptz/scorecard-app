import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Card} from '@dhis2/ui'
import React, {useRef, useState} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {FilterComponentTypes} from "../../../../../../core/constants/selection";
import ScorecardConfState, {ScorecardIdState, ScorecardViewState} from "../../../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../../../core/state/user";
import OrgUnitSelectorModal from "../../../../../../shared/Components/OrgUnitSelectorModal";
import PeriodSelectorModal from "../../../../../../shared/Components/PeriodSelectorModal";
import ScorecardOptionsModal from "../../../../../../shared/Components/ScorecardOptionsModal";
import SelectionWrapper from "../../../../../../shared/Components/SelectionWrapper";
import DownloadMenu from "../Download/Components/DownloadMenu";
import useDownload from "./hooks/useDownload";

export default function ScorecardViewHeader() {
    const history = useHistory();
    const scorecardId = useRecoilValue(ScorecardIdState)
    const [orgUnitSelection, setOrgUnitSelection] = useRecoilState(ScorecardViewState('orgUnitSelection'))
    const [periodSelection, setPeriodSelection] = useRecoilState(ScorecardViewState('periodSelection'))
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardViewState('options'))
    const resetScorecardState = useResetRecoilState(ScorecardConfState(scorecardId))
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState)
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const writeAccess = userAuthority?.write;
    const [orgUnitSelectionOpen, setOrgUnitSelectionOpen] = useState(false);
    const [periodSelectionOpen, setPeriodSelectionOpen] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const {download: onDownload} = useDownload();
    const downloadRef = useRef()

    const onEdit = () => {
        if (writeAccess) {
            history.push(`/edit/${scorecardId}`)
        }
    }

    const onHome = () => {
        resetScorecardState();
        resetScorecardIdState();
        history.replace('/')
    }

    const onRefresh = () => {
        console.log(history.location.pathname)
        window.location.reload(true)
    }

    return (
        <div className="selection-card">
            <Card>
                <div className='row space-between align-items-center pl-16 pr-16'>
                    <div className='row'>
                        <SelectionWrapper
                            selectedItems={orgUnitSelection?.orgUnits}
                            name={'Organisation Unit'}
                            onClick={() => {
                                setOrgUnitSelectionOpen(true)
                            }} type={FilterComponentTypes.ORG_UNIT}/>
                        <SelectionWrapper
                            selectedItems={periodSelection?.periods}
                            name='Period'
                            onClick={() => {
                                setPeriodSelectionOpen(true)
                            }}
                            type={FilterComponentTypes.PERIOD}/>
                    </div>
                    <div className='column align-items-end'>
                        <ButtonStrip className='pb-8'>
                            <Button onClick={onHome}>{i18n.t('Home')}</Button>
                            <Button onClick={onRefresh}>{i18n.t('Refresh')}</Button>
                        </ButtonStrip>
                        <ButtonStrip>
                            <Button onClick={() => setOptionsOpen(true)}>{i18n.t('Options')}</Button>
                            {writeAccess && <Button onClick={onEdit}>Edit</Button>}
                            <Button onClick={() => setDownloadOpen(true)}>
                                <div ref={downloadRef}>{i18n.t("Download")}</div>
                            </Button>
                            {downloadOpen &&
                            <DownloadMenu reference={downloadRef} onClose={() => setDownloadOpen(false)}
                                          onDownload={onDownload}/>}
                            <Button>{i18n.t('Help')}</Button>
                        </ButtonStrip>
                    </div>
                    {
                        orgUnitSelectionOpen && <OrgUnitSelectorModal initialValue={orgUnitSelection}
                                                                      onClose={() => setOrgUnitSelectionOpen(false)}
                                                                      onSelect={setOrgUnitSelection}/>
                    }{
                    periodSelectionOpen &&
                    <PeriodSelectorModal initialValue={periodSelection} onClose={() => setPeriodSelectionOpen(false)}
                                         onSelect={setPeriodSelection}/>
                }{
                    optionsOpen &&
                    <ScorecardOptionsModal onClose={() => setOptionsOpen(false)} initialValues={scorecardOptions}
                                           onSelect={setScorecardOptions}/>
                }
                </div>
            </Card>
        </div>
    )
}
