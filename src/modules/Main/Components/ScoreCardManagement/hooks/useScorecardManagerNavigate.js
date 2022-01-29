import i18n from "@dhis2/d2-i18n";
import {findIndex} from "lodash";
import {useMemo, useState} from "react";
import {useRecoilState} from "recoil";
import {
    DATA_CONFIGURATION_HELP_STEPS,
    GENERAL_HELP_STEPS
} from "../../../../../core/constants/help/scorecardManagement";
import {HelpIndex} from "../../../../../core/state/help";
import AccessScorecardForm from "../Components/Access";
import DataConfigurationScorecardForm from "../Components/DataConfiguration";
import GeneralScorecardForm from "../Components/General";
import HighlightedIndicatorsScorecardForm from "../Components/HighlightedIndicators";
import OptionsScorecardForm from "../Components/Options";

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

export default function useScorecardManagerNavigate({form, onSave, onNavigate}) {
    const [helpStepIndex, setHelpStepIndex] = useRecoilState(HelpIndex);
    const [activeStep, setActiveStep] = useState(steps[0]);
    const Component = activeStep.component;

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

    const onNextStep = () => {
        if (!hasNextStep) {
            form.handleSubmit(onSave);
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

    return {
        Component,
        activeStep,
        setActiveStep,
        onNextStep,
        onPreviousStep,
        onCancel,
        helpStepIndex,
        setHelpStepIndex,
        hasNextStep,
        hasPreviousStep,
        currentIndex,
        steps,
    }
}
