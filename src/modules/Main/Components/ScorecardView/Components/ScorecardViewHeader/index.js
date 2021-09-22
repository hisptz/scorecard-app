import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Card} from '@dhis2/ui'
import {Steps} from "intro.js-react";
import React, {useEffect, useMemo, useState} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import {STEP_OPTIONS} from "../../../../../../core/constants/help/options";
import {SCORECARD_VIEW_HELP_STEPS} from "../../../../../../core/constants/help/scorecardView";
import {FilterComponentTypes} from "../../../../../../core/constants/selection";
import HelpState from "../../../../../../core/state/help";
import {OrgUnitGroups, OrgUnitLevels} from "../../../../../../core/state/orgUnit";
import ScorecardConfState, {ScorecardIdState, ScorecardViewState} from "../../../../../../core/state/scorecard";
import OrgUnitSelectorModal from "../../../../../../shared/Components/OrgUnitSelectorModal";
import PeriodSelectorModal from "../../../../../../shared/Components/PeriodSelectorModal";
import SelectionWrapper from "../../../../../../shared/Components/SelectionWrapper";
import getSelectedOrgUnitSelectionDisplay from "../../../../../../shared/utils/orgUnit";


export default function ScorecardViewHeader() {
    const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState)
    const history = useHistory();
    const scorecardId = useRecoilValue(ScorecardIdState)
    const orgUnitLevels = useRecoilValue(OrgUnitLevels)
    const orgUnitGroups = useRecoilValue(OrgUnitGroups)
    const [orgUnitSelection, setOrgUnitSelection] = useRecoilState(ScorecardViewState('orgUnitSelection'))
    const [periodSelection, setPeriodSelection] = useRecoilState(ScorecardViewState('periodSelection'))

    const [orgUnitSelectionOpen, setOrgUnitSelectionOpen] = useState(false);
    const [periodSelectionOpen, setPeriodSelectionOpen] = useState(false);


    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardIdState)
        reset(ScorecardConfState(scorecardId))
    }, [scorecardId])


    const onHome = () => {
        history.replace('/')
    }

    useEffect(() => {
        return () => {
            reset()
        };
    }, []);


    const orgUnitSelectionDisplay = useMemo(() => getSelectedOrgUnitSelectionDisplay(orgUnitSelection, {
        orgUnitGroups,
        orgUnitLevels
    }), [orgUnitGroups, orgUnitLevels, orgUnitSelection]);

    const onHelpExit = () => {
        setHelpEnabled(false)
    }

    return (
        <div className="selection-card">
            <Steps options={STEP_OPTIONS} steps={SCORECARD_VIEW_HELP_STEPS} enabled={helpEnabled} initialStep={0}
                   onExit={onHelpExit}/>
            <Card>
                <div className='row space-between align-items-center pl-16 pr-16'>
                    <div className='row'>
                        <SelectionWrapper
                            id={"org-unit-selector"}
                            selectedItems={orgUnitSelectionDisplay}
                            name={'Organisation Unit'}
                            dataTest={'test-selected-organization-unit'}
                            onClick={() => {
                                setOrgUnitSelectionOpen(true)
                            }} type={FilterComponentTypes.ORG_UNIT}/>
                        <SelectionWrapper
                            id={"period-selector"}
                            selectedItems={periodSelection?.periods}
                            dataTest={'test-selected-period'}
                            name='Period'
                            onClick={() => {
                                setPeriodSelectionOpen(true)
                            }}
                            type={FilterComponentTypes.PERIOD}/>
                    </div>
                    <div className='column align-items-end'>
                        <ButtonStrip className='pb-8'>
                            <Button className="home-button" onClick={onHome}>{i18n.t('Home')}</Button>
                            <Button onClick={() => setHelpEnabled(true)}>{i18n.t('Help')}</Button>

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
                }
                </div>
            </Card>
        </div>
    )
}


