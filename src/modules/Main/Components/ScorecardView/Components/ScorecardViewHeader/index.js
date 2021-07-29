import {Button, ButtonStrip, Card} from '@dhis2/ui'
import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {FilterComponentTypes} from "../../../../../../core/constants/selection";
import ScorecardConfState, {ScorecardIdState, ScorecardViewSelector} from "../../../../../../core/state/scorecard";
import OrgUnitSelectorModal from "../../../../../../shared/Components/OrgUnitSelectorModal";
import PeriodSelectorModal from "../../../../../../shared/Components/PeriodSelectorModal";
import ScorecardOptionsModal from "../../../../../../shared/Components/ScorecardOptionsModal";
import SelectionWrapper from "../../../../../../shared/Components/SelectionWrapper";

export default function ScorecardViewHeader() {
    const history = useHistory();
    const scorecardId = useRecoilValue(ScorecardIdState)
    const [orgUnitSelection, setOrgUnitSelection] = useRecoilState(ScorecardViewSelector('orgUnitSelection'))
    const [periodSelection, setPeriodSelection] = useRecoilState(ScorecardViewSelector('periodSelection'))
    const [scorecardOptions, setScorecardOptions] = useRecoilState(ScorecardViewSelector('options'))
    const resetScorecardState = useResetRecoilState(ScorecardConfState(scorecardId))
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState)

    const [orgUnitSelectionOpen, setOrgUnitSelectionOpen] = useState(false);
    const [periodSelectionOpen, setPeriodSelectionOpen] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);

    const onEdit = () => {
        history.push(`/edit/${scorecardId}`, {from: 'view'})
    }

    const onHome = () => {
        resetScorecardState();
        resetScorecardIdState();
        history.replace('/')
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
                            <Button onClick={onHome}>Home</Button>
                            <Button>Refresh</Button>
                        </ButtonStrip>
                        <ButtonStrip>
                            <Button onClick={() => setOptionsOpen(true)}>Options</Button>
                            <Button onClick={onEdit}>Edit</Button>
                            <Button>Print</Button>
                            <Button>Help</Button>
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
