import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {findIndex} from "lodash";
import {useCallback, useEffect, useMemo} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {HelpIndex} from "../../../../../core/state/help";
import {IsNewScorecardState} from "../../../../../core/state/scorecard";
import {getValidationPageFields} from "../services/validator";
import {ActiveStepState, steps} from "../state/pages";

export default function useScorecardManagerNavigate({form, onSave, onNavigate}) {
    const [helpStepIndex, setHelpStepIndex] = useRecoilState(HelpIndex);
    const [activeStep, setActiveStep] = useRecoilState(ActiveStepState);
    const isNew = useRecoilValue(IsNewScorecardState);
    const resetNewState = useResetRecoilState(IsNewScorecardState);
    const Component = activeStep.component;
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    useEffect(() => {
        console.log({isNew});
        if (isNew) {
            setActiveStep(steps[isNew.nextStepIndex]);
            return resetNewState;
        }
    }, [isNew, resetNewState, setActiveStep]);

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
