import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, Card} from "@dhis2/ui";
import {OrgUnitSelectorModal, PeriodSelectorModal} from "@hisptz/dhis2-ui";
import {PeriodUtility} from "@hisptz/dhis2-utils"
import {Steps} from "intro.js-react";
import React, {useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";

import SelectionWrapper from "../../../SelectionWrapper";
import {
    HelpState,
    OrgUnitGroups,
    OrgUnitLevels,
    ScorecardConfState,
    ScorecardIdState,
    ScorecardViewState,
    SystemSettingsState
} from "../../../../state";
import {getSelectedOrgUnitSelectionDisplay} from "../../../../utils";
import {
    FilterComponentTypes,
    SCORECARD_VIEW_HELP_STEPS,
    STEP_OPTIONS,
    UNSUPPORTED_PERIOD_TYPES
} from "../../../../constants";


export default function ScorecardViewHeader() {
    const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState);
    const {calendar} = useRecoilValue(SystemSettingsState) ?? {};
    const history = useHistory();
    const scorecardId = useRecoilValue(ScorecardIdState);
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const orgUnitGroups = useRecoilValue(OrgUnitGroups);
    const [orgUnitSelection, setOrgUnitSelection] = useRecoilState(
        ScorecardViewState("orgUnitSelection")
    );
    const [periodSelection, setPeriodSelection] = useRecoilState(
        ScorecardViewState("periodSelection")
    );

    const [orgUnitSelectionOpen, setOrgUnitSelectionOpen] = useState(false);
    const [periodSelectionOpen, setPeriodSelectionOpen] = useState(false);

    const reset = useRecoilCallback(
        ({reset}) =>
            () => {
                reset(ScorecardIdState);
                reset(ScorecardConfState(scorecardId));
            },
        [scorecardId]
    );

    const onHome = () => {
        history.replace("/");
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const orgUnitSelectionDisplay = useMemo(
        () =>
            getSelectedOrgUnitSelectionDisplay(orgUnitSelection, {
                orgUnitGroups,
                orgUnitLevels,
            }),
        [orgUnitGroups, orgUnitLevels, orgUnitSelection]
    );

    const onHelpExit = () => {
        setHelpEnabled(false);
    };

    return (
        <div className="selection-card">
            <Steps
                options={STEP_OPTIONS}
                steps={SCORECARD_VIEW_HELP_STEPS}
                enabled={helpEnabled}
                initialStep={0}
                onExit={onHelpExit}
            />
            <Card>
                <div className="row space-between align-items-center pl-16 pr-16">
                    <div className="row align-items-center">
                        <SelectionWrapper
                            id={"org-unit-selector"}
                            selectedItems={orgUnitSelectionDisplay}
                            name={"Organisation Unit"}
                            dataTest={"test-selected-organization-unit"}
                            onClick={() => {
                                setOrgUnitSelectionOpen(true);
                            }}
                            type={FilterComponentTypes.ORG_UNIT}
                        />
                        <SelectionWrapper
                            id={"period-selector"}
                            selectedItems={periodSelection?.periods}
                            dataTest={"test-selected-period"}
                            name="Period"
                            onClick={() => {
                                setPeriodSelectionOpen(true);
                            }}
                            type={FilterComponentTypes.PERIOD}
                        />
                    </div>
                    <div className="column align-items-end">
                        <ButtonStrip className="pb-8">
                            <Button className="home-button" onClick={onHome}>
                                {i18n.t("Back to all scorecards")}
                            </Button>
                            <Button onClick={() => setHelpEnabled(true)}>
                                {i18n.t("Help")}
                            </Button>
                        </ButtonStrip>
                    </div>
                    {
                        orgUnitSelectionOpen && <OrgUnitSelectorModal
                            value={orgUnitSelection}
                            showGroups
                            showLevels
                            showUserOptions
                            hide={!orgUnitSelectionOpen}
                            onClose={() => setOrgUnitSelectionOpen(false)}
                            onUpdate={(selected) => {
                                setOrgUnitSelection(selected)
                                setOrgUnitSelectionOpen(false)
                            }}
                        />
                    }
                    {
                        periodSelectionOpen && <PeriodSelectorModal
                            enablePeriodSelector
                            excludedPeriodTypes={UNSUPPORTED_PERIOD_TYPES}
                            calendar={calendar}
                            selectedPeriods={periodSelection.periods.map(({id}) => id)}
                            hide={!periodSelectionOpen}
                            onClose={() => setPeriodSelectionOpen(false)}
                            onUpdate={(selectedPeriods) => {
                                setPeriodSelection({periods: selectedPeriods.map(period => PeriodUtility.getPeriodById(period))})
                                setPeriodSelectionOpen(false)
                            }}
                        />
                    }
                </div>
            </Card>
        </div>
    );
}
