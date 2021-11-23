import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip} from "@dhis2/ui";
import {Step, StepLabel, Stepper} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import {Steps} from "intro.js-react";
import {findIndex, fromPairs, isEmpty} from "lodash";
import React, {Suspense, useEffect, useMemo, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState, waitForAll,} from "recoil";
import {STEP_OPTIONS} from "../../../../core/constants/help/options";
import {DATA_CONFIGURATION_HELP_STEPS, GENERAL_HELP_STEPS,} from "../../../../core/constants/help/scorecardManagement";
import Scorecard from "../../../../core/models/scorecard";
import HelpState, {HelpIndex, HelpSteps} from "../../../../core/state/help";
import RouterState from "../../../../core/state/router";
import ScorecardConfState, {
    ScorecardConfigDirtyState,
    ScorecardConfigEditState,
    ScorecardConfigErrorState,
    ScorecardIdState,
} from "../../../../core/state/scorecard";
import {UserAuthorityOnScorecard, UserState,} from "../../../../core/state/user";
import {ShouldValidate} from "../../../../core/state/validators";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import {useAddScorecard, useUpdateScorecard,} from "../../../../shared/hooks/datastore/useScorecard";
import useMediaQuery from "../../../../shared/hooks/useMediaQuery";
import AccessDeniedPage from "../ScorecardView/Components/AccessDeniedPage";
import AccessScorecardForm from "./Components/Access";
import DataConfigurationScorecardForm from "./Components/DataConfiguration";
import GeneralScorecardForm from "./Components/General";
import HighlightedIndicatorsScorecardForm from "./Components/HighlightedIndicators";
import OptionsScorecardForm from "./Components/Options";
import classes from './ScorecardManagement.module.css'
import sanitizeScorecard from "./services/sanitizers";
import validateScorecard from "./services/validator";

const steps = [
    {
        label: i18n.t("General"),
        component: GeneralScorecardForm,
        helpSteps: GENERAL_HELP_STEPS,
    },
    {
        label: i18n.t("Data Configuration"),
        component: DataConfigurationScorecardForm,
        helpSteps: DATA_CONFIGURATION_HELP_STEPS,
    },
    {
        label: i18n.t("Highlighted Indicators"),
        component: HighlightedIndicatorsScorecardForm,
        helpSteps: [],
    },
    {
        label: i18n.t("Access"),
        component: AccessScorecardForm,
        helpSteps: [],
    },
    {
        label: i18n.t("Options"),
        component: OptionsScorecardForm,
        helpSteps: [],
    },
];

const keys = Object.keys(new Scorecard());

export default function ScoreCardManagement() {
    const [route, setRoute] = useRecoilState(RouterState);
    const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState);
    const helpSteps = useRecoilValue(HelpSteps);
    const [helpStepIndex, setHelpStepIndex] = useRecoilState(HelpIndex);
    const {id: scorecardId} = useParams();
    const user = useRecoilValue(UserState);
    const {write: writeAccess} = useRecoilValue(
        UserAuthorityOnScorecard(scorecardId)
    );
    const setScorecardIdState = useSetRecoilState(ScorecardIdState);
    const {update} = useUpdateScorecard(scorecardId);
    const {add} = useAddScorecard();
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const [saving, setSaving] = useState(false);
    const {height} = useMediaQuery();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(steps[0]);
    const Component = activeStep.component;

    const resetEditStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfigEditState);
        reset(ScorecardConfigErrorState);
        reset(ShouldValidate);
        for (const key of keys) {
            reset(ScorecardConfigDirtyState(key));
        }
    });
    const resetScorecardStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfState(scorecardId));
        reset(ScorecardIdState);
        for (const key of keys) {
            reset(ScorecardConfigDirtyState(key));
        }
    });

    const onNavigate = () => {
        setRoute((prevRoute) => ({
            ...prevRoute,
            previous: `/edit/${scorecardId}`,
        }));
        history.replace(route?.previous);
    };

    const createNewScorecard = async (updatedScorecard) => {
        await Scorecard.save(updatedScorecard, add, user);
        show({
            message: i18n.t("Scorecard added successfully"),
            type: {success: true},
        });
        onNavigate();
    };

    const updateData = async (updatedScorecard) => {
        await Scorecard.update(updatedScorecard, update);
        show({
            message: i18n.t("Scorecard updated successfully"),
            type: {success: true},
        });
        onNavigate();
    };

    const onSave = useRecoilCallback(({snapshot, set}) => async () => {
        setSaving(true);
        try {
            set(ShouldValidate, true);
            const updatedScorecard = snapshot.getLoadable(
                waitForAll(
                    fromPairs(keys?.map((key) => [key, ScorecardConfigDirtyState(key)]))
                )
            ).contents;

            const errors = validateScorecard(updatedScorecard);
            const sanitizedScorecard = sanitizeScorecard(updatedScorecard);
            if (!isEmpty(errors)) {
                const errorMessage = `Please fill in the required field(s)`;
                show({
                    message: i18n.t(errorMessage),
                    type: {info: true},
                });
            }
            if (isEmpty(errors)) {
                if (scorecardId) {
                    await updateData(sanitizedScorecard);
                } else {
                    await createNewScorecard(sanitizedScorecard);
                }
            }
        } catch (e) {
            console.log(e);
        }
        setSaving(false);
    });

    const onNextStep = () => {
        if (!hasNextStep) {
            onSave();
            return;
        }
        const index = findIndex(steps, ["label", activeStep.label]);
        if (index !== steps.length - 1) {
            setActiveStep(steps[index + 1]);
            setHelpStepIndex(0);
        }
    };

    const onPreviousStep = () => {
        const index = findIndex(steps, ["label", activeStep.label]);

        if (index !== 0) {
            setActiveStep(steps[index - 1]);
            setHelpStepIndex(0);
        }
    };

    const onCancel = () => {
        onNavigate();
    };

    useEffect(() => {
        setScorecardIdState(scorecardId);
        return () => {
            resetEditStates();
            if (route?.previous === "/") {
                resetScorecardStates();
            }
        };
    }, [scorecardId, route]);

    const hasNextStep = useMemo(
        () => findIndex(steps, ["label", activeStep.label]) !== steps.length - 1,
        [activeStep]
    );
    const hasPreviousStep = useMemo(
        () => findIndex(steps, ["label", activeStep.label]) > 0,
        [activeStep]
    );

    const currentIndex = useMemo(
        () => findIndex(steps, ["label", activeStep.label]),
        [activeStep]
    );

    if (!writeAccess && scorecardId) {
        return <AccessDeniedPage accessType={"edit"}/>;
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <div className={classes["edit-container"]}>
                <Steps
                    enabled={helpEnabled}
                    options={STEP_OPTIONS}
                    steps={helpSteps}
                    initialStep={helpStepIndex}
                    onBeforeChange={(newStepIndex) => {
                        setHelpStepIndex(newStepIndex);
                    }}
                    onExit={() => {
                        setHelpEnabled(false);
                    }}
                />
                <div className="column">
                    <div>
                        <Stepper>
                            {steps?.map((step) => (
                                <Step
                                    style={
                                        step === activeStep ? {background: "#00695c"} : undefined
                                    }
                                    active={step === activeStep}
                                    onClick={() => setActiveStep(step)}
                                    key={`${step.label}-step`}
                                >
                                    <StepLabel>{step.label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                    <div className="row">
                        <div className="column center" style={{flex: 1}}>
                            <div
                                className="container container-bordered background-white center"
                                style={{width: '100%', height: '100%', minHeight: height * 0.8}}
                            >
                                <div className="row" style={{height: "100%"}}>
                                    <div
                                        className="column p-16"
                                        style={{height: "100%", justifyContent: "space-between"}}
                                    >
                                        <div className="row end align-items-center">
                                            <Button
                                                icon={<HelpIcon/>}
                                                onClick={() => {
                                                    setHelpStepIndex(0);
                                                    setHelpEnabled(true);
                                                }}
                                            >
                                                {i18n.t("Help")}
                                            </Button>
                                        </div>
                                        <div style={{height: '100%', padding: 16}}>
                                            {
                                                <Suspense fallback={<FullPageLoader small/>}>
                                                    <Component
                                                        onNextStep={onNextStep}
                                                        onPreviousStep={onPreviousStep}
                                                    />
                                                </Suspense>
                                            }
                                        </div>
                                        <ButtonStrip start>
                                            <Button
                                                disabled={!hasPreviousStep}
                                                onClick={onPreviousStep}
                                            >
                                                {i18n.t(
                                                    `Previous: ${steps[currentIndex - 1]?.label ?? ""}`
                                                )}
                                            </Button>
                                            <Button
                                                primary
                                                disabled={saving}
                                                onClick={onNextStep}
                                                className="settings-next-button"
                                                dataTest="scorecard-admin-next-button"
                                            >
                                                {!hasNextStep
                                                    ? saving
                                                        ? `${i18n.t("Saving")}...`
                                                        : i18n.t("Save")
                                                    : i18n.t(`Next: ${steps[currentIndex + 1]?.label}`)}
                                            </Button>
                                        </ButtonStrip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row center p-16">
                        <ButtonStrip center>
                            <Button
                                dataTest="scorecard-save-button"
                                disabled={saving}
                                onClick={onSave}
                            >
                                {saving ? `${i18n.t("Saving")}...` : i18n.t("Save and exit")}
                            </Button>
                            <Button onClick={onCancel}>
                                {i18n.t("Exit without saving")}
                            </Button>
                        </ButtonStrip>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
