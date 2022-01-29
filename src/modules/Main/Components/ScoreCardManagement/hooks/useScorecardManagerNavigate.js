import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {findIndex} from "lodash";
import {useCallback, useMemo, useState} from "react";
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
import {getValidationPageFields} from "../services/validator";

const steps = [
    {
        label: i18n.t("General"),
        component: GeneralScorecardForm,
        helpSteps: GENERAL_HELP_STEPS,
        id: "general"
    },
    {
        label: i18n.t("Data Configuration"),
        component: DataConfigurationScorecardForm,
        helpSteps: DATA_CONFIGURATION_HELP_STEPS,
        id: "dataConfiguration"
    },
    {
        label: i18n.t("Highlighted Indicators"),
        component: HighlightedIndicatorsScorecardForm,
        helpSteps: [],
        id: "highlightedIndicators"
    },
    {
        label: i18n.t("Access"),
        component: AccessScorecardForm,
        helpSteps: [],
        id: "access"
    },
    {
        label: i18n.t("Options"),
        component: OptionsScorecardForm,
        helpSteps: [],
        id: "options"
    },
];

export default function useScorecardManagerNavigate({form, onSave, onNavigate}) {
    const [helpStepIndex, setHelpStepIndex] = useRecoilState(HelpIndex);
    const [activeStep, setActiveStep] = useState(steps[0]);
    const Component = activeStep.component;
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    const hasNextStep = useMemo(
        () => findIndex(steps, ["id", activeStep.id]) !== steps.length - 1,
        [activeStep]
    );
    const hasPreviousStep = useMemo(
        () => findIndex(steps, ["id", activeStep.id]) > 0,
        [activeStep]
    );

    const currentIndex = useMemo(
        () => findIndex(steps, ["id", activeStep.id]),
        [activeStep]
    );

    const onNextStep = async () => {
        if (!hasNextStep) {
            form.handleSubmit(onSave);
            return;
        }

        if (!(await form.trigger())) {
            show({message: i18n.t("Please fill in all required fields"), type: {info: true}});
            return;
        }
        const index = findIndex(steps, ["id", activeStep.id]);
        if (index !== steps.length - 1) {
            setActiveStep(steps[index + 1]);
            setHelpStepIndex(0);
        }
    };

    const onStepChange = useCallback(
        async (step) => {
            if (!(await form.trigger(getValidationPageFields(form, activeStep)))) {
                return;
            }
            setActiveStep(step);
        },
        [activeStep, form],
    );


    const onPreviousStep = () => {
        const index = findIndex(steps, ["id", activeStep.id]);
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
        onNextStep,
        onPreviousStep,
        onCancel,
        helpStepIndex,
        setHelpStepIndex,
        hasNextStep,
        hasPreviousStep,
        currentIndex,
        steps,
        onStepChange
    }
}
