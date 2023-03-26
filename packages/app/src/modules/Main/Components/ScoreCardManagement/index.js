import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, Tooltip} from "@dhis2/ui";
import {Step, StepLabel, Stepper} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import {
    AccessDeniedPage,
    FullPageLoader,
    HelpState,
    HelpSteps,
    STEP_OPTIONS,
    useMediaQuery,
    UserAuthorityOnScorecard
} from "@scorecard/shared";
import {Steps} from "intro.js-react";
import React, {Suspense} from "react";
import {FormProvider} from "react-hook-form";
import {useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import useScorecardManage from "./hooks/useScorecardManage";
import useScorecardManagerNavigate from "./hooks/useScorecardManagerNavigate";
import classes from "./ScorecardManagement.module.css";

export default function ScoreCardManagement() {
    const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState);
    const helpSteps = useRecoilValue(HelpSteps);
    const {id: scorecardId} = useParams();
    const {write: writeAccess} = useRecoilValue(
        UserAuthorityOnScorecard(scorecardId)
    );
    const {height} = useMediaQuery();
    const {
        form,
        onSave,
        saving,
        onNavigate,
        onSaveAndContinue,
        savingAndContinue,
    } = useScorecardManage();
    const {
        Component,
        activeStep,
        helpStepIndex,
        onCancel,
        onNextStep,
        onPreviousStep,
        setHelpStepIndex,
        steps,
        currentIndex,
        hasPreviousStep,
        hasNextStep,
        onStepChange,
    } = useScorecardManagerNavigate({form, onSave, onNavigate});

    if (!writeAccess && scorecardId) {
        return <AccessDeniedPage accessType={"edit"}/>;
    }
    //scorecardManagementTooltips
    return (
        <FormProvider {...form}>
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
                                            step === activeStep
                                                ? {background: "#00695c"}
                                                : undefined
                                        }
                                        active={step === activeStep}
                                        onClick={() => onStepChange(step)}
                                        key={`${step.id}-step`}
                                    >

                                        <StepLabel>
                                            <Tooltip
                                                content={step.tooltip}
                                                key={`${step.id}-step`}
                                            >
                                                {step.label}
                                            </Tooltip>
                                        </StepLabel>

                                    </Step>

                                ))}
                            </Stepper>
                        </div>
                        <div className="row">
                            <div className="column center" style={{flex: 1}}>
                                <div
                                    className="container container-bordered background-white center"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        minHeight: height * 0.8,
                                    }}
                                >
                                    <div className="row" style={{height: "100%"}}>
                                        <div
                                            className="column p-16"
                                            style={{
                                                height: "100%",
                                                justifyContent: "space-between",
                                            }}
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
                                            <div style={{height: "100%", padding: 16}}>
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
                                                    loading={saving}
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
                                    loading={saving}
                                    dataTest="scorecard-save-button"
                                    disabled={saving}
                                    onClick={form.handleSubmit(onSave)}
                                >
                                    {saving ? `${i18n.t("Saving")}...` : i18n.t("Save and exit")}
                                </Button>
                                {hasNextStep && (
                                    <Button
                                        loading={savingAndContinue}
                                        dataTest="scorecard-save-and-continue-button"
                                        disabled={savingAndContinue}
                                        onClick={form.handleSubmit(onSaveAndContinue)}
                                    >
                                        {savingAndContinue
                                            ? `${i18n.t("Saving")}...`
                                            : i18n.t("Save and continue")}
                                    </Button>
                                )}
                                <Button onClick={onCancel}>
                                    {i18n.t("Exit without saving")}
                                </Button>
                            </ButtonStrip>
                        </div>
                    </div>
                </div>
            </Suspense>
        </FormProvider>
    );
}
