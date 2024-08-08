import { useAlert } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
	getValidationPageFields,
	HelpIndex,
	IsNewScorecardState,
} from "@scorecard/shared";
import { find, findIndex, isEmpty } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { ActiveStepState, steps } from "../state/pages";

export default function useScorecardManagerNavigate({
	form,
	onSave,
	onNavigate,
}: any) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [helpStepIndex, setHelpStepIndex] = useRecoilState(HelpIndex);
	const [activeStep, setActiveStep] = useRecoilState(ActiveStepState);
	const { search, pathname } = useLocation();
	const resetNewState = useResetRecoilState(IsNewScorecardState);
	const Component = activeStep.component;
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 }),
	);

	useEffect(() => {
		const searchParams = new URLSearchParams(search);

		const step = pathname.substring(pathname.lastIndexOf("/") + 1);

		if (!isEmpty(step)) {
			const currentStep = find(steps, { id: step });

			if (!isEmpty(currentStep)) {
				setActiveStep(() => {
					return currentStep;
				});
			}
		}

		const isNew = searchParams.get("new");
		if (isNew) {
			setActiveStep((prevStep) => {
				const currentIndex = findIndex(steps, ["id", prevStep.id]);
				if (currentIndex === 0) {
					return steps[0];
				} else {
					return prevStep;
				}
			});
		}
	}, [resetNewState, search, setActiveStep, pathname, id]);

	const hasNextStep = useMemo(
		() => findIndex(steps, ["id", activeStep.id]) !== steps.length - 1,
		[activeStep],
	);
	const hasPreviousStep = useMemo(
		() => findIndex(steps, ["id", activeStep.id]) > 0,
		[activeStep],
	);

	const currentIndex = useMemo(
		() => findIndex(steps, ["id", activeStep.id]),
		[activeStep],
	);

	const onNextStep = async () => {
		if (!hasNextStep) {
			await form.handleSubmit(onSave)();
			return;
		}

		const index = findIndex(steps, ["id", activeStep.id]);
		if (index !== steps.length - 1) {
			onStepChange(steps[index + 1]);
			setHelpStepIndex(0);
		}
	};

	const onStepChange = useCallback(
		async (step: any) => {
			if (
				!(await form.trigger(getValidationPageFields(form, activeStep)))
			) {
				show({
					message: i18n.t("Please fill in all required fields"),
					type: { info: true },
				});
				return;
			}

			if (isEmpty(id)) {
				navigate(`/add/${step.id}`);
			} else {
				const searchParams = new URLSearchParams(search);
				const isNew = searchParams.get("new");
				const newQuery = isNew ? "?new=true" : "";
				navigate(`/edit/${id}/${step.id}${newQuery}`);
			}
		},
		[activeStep, form, navigate],
	);

	const onPreviousStep = () => {
		const index = findIndex(steps, ["id", activeStep.id]);

		if (index !== 0) {
			onStepChange(steps[index - 1]);
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
		onStepChange,
	};
}
