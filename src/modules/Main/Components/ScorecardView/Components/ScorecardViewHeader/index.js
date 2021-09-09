import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Card} from '@dhis2/ui'
import {find, isEmpty} from "lodash";
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {FilterComponentTypes} from "../../../../../../core/constants/selection";
import {OrgUnitGroups, OrgUnitLevels} from "../../../../../../core/state/orgUnit";
import ScorecardConfState, {ScorecardIdState, ScorecardViewState} from "../../../../../../core/state/scorecard";
import {UserAuthorityOnScorecard} from "../../../../../../core/state/user";
import OrgUnitSelectorModal from "../../../../../../shared/Components/OrgUnitSelectorModal";
import PeriodSelectorModal from "../../../../../../shared/Components/PeriodSelectorModal";
import ScorecardOptionsModal from "../../../../../../shared/Components/ScorecardOptionsModal";
import SelectionWrapper from "../../../../../../shared/Components/SelectionWrapper";
import DownloadMenu from "../Download/Components/DownloadMenu";
import useDownload from "./hooks/useDownload";

export default function ScorecardViewHeader({downloadAreaRef}) {
    const history = useHistory();
    const scorecardId = useRecoilValue(ScorecardIdState)
    const orgUnitLevels = useRecoilValue(OrgUnitLevels)
    const orgUnitGroups = useRecoilValue(OrgUnitGroups)
    const [orgUnitSelection, setOrgUnitSelection] = useRecoilState(ScorecardViewState('orgUnitSelection'))
    const [periodSelection, setPeriodSelection] = useRecoilState(ScorecardViewState('periodSelection'))
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardViewState('options'))
    const userAuthority = useRecoilValue(UserAuthorityOnScorecard(scorecardId))
    const writeAccess = userAuthority?.write;
    const [orgUnitSelectionOpen, setOrgUnitSelectionOpen] = useState(false);
    const [periodSelectionOpen, setPeriodSelectionOpen] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [downloadOpen, setDownloadOpen] = useState(false);
    const {download: onDownload} = useDownload(downloadAreaRef);

    const downloadRef = useRef()
    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardIdState)
        reset(ScorecardConfState(scorecardId))
    }, [scorecardId])

    const onEdit = () => {
        if (writeAccess) {
            history.push(`/edit/${scorecardId}`)
        }
    }

    const onHome = () => {
        history.replace('/')
    }

    useEffect(() => {
        return () => {
            reset()
        };
    }, []);

    const onRefresh = () => {
        window.location.reload(true)
    }

    const orgUnitSelectionDisplay = useMemo(() => {
        const {orgUnits,
            level,
            group,
            userOrgUnit,
            userSubUnit,
            userSubX2Unit} = orgUnitSelection;

        const display = [...orgUnits]

        if(level){
            display.push({
                name: `Levels: ${[level]?.map(level=>{
                    console.log({orgUnitLevels, level})
                    const levelObject = find(orgUnitLevels, ['id', level]) ?? {}
                    return levelObject.displayName
                })}`
            })
        }
        if(group){
            display.push({
                name: `Groups: ${[group]?.map(group=>(find(orgUnitGroups, ['id', group])).displayName)}`
            })
        }

        return display

    }, [orgUnitSelection]);


    return (
        <div className="selection-card">
            <Card>
                <div className='row space-between align-items-center pl-16 pr-16'>
                    <div className='row'>
                        <SelectionWrapper
                            selectedItems={orgUnitSelectionDisplay}
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
