import { Button, ButtonStrip } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useFormContext } from "react-hook-form";
import useScorecardManagerNavigate from "../hooks/navigate";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@dhis2/app-runtime";


export function StepNavigationButtons() {
	const { formState, trigger } = useFormContext();
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));
	const navigate = useNavigate();
	const saving = formState.isSubmitting || formState.isValidating;
	const { hasNext, hasPrevious, next, previous, currentStep } = useScorecardManagerNavigate();
	const onNext = async () => {
		if (next) {
			if (await trigger(currentStep.fieldIds)) {
				navigate(next.id);
			} else {
				show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
			}
		}
	};

	const onPrevious = async () => {
		if (previous) {
			if (await trigger(currentStep.fieldIds)) {
				navigate(previous.id);
			} else {
				show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
			}
		}
	};


	return (
		<div style={{ gap: 8 }} className="row align-items-center">
			<Button
				disabled={!hasPrevious}
				onClick={onPrevious}
			>
				{i18n.t(
					`Previous: ${previous?.label ?? ""}`
				)}
			</Button>
			<Button
				loading={saving}
				primary
				disabled={saving}
				onClick={onNext}
				className="settings-next-button"
				dataTest="scorecard-admin-next-button"
			>
				{!hasNext
					? saving
						? `${i18n.t("Saving")}...`
						: i18n.t("Save")
					: i18n.t(
						`Next: ${next!.label}`
					)}
			</Button>
		</div>
	);
}

export function NavigationButtons() {
	const { formState, handleSubmit } = useFormContext();
	const saving = formState.isSubmitting || formState.isValidating;
	const { hasNext } = useScorecardManagerNavigate();

	const onSaveAndContinue = async () => {

	};
	const onSave = () => {

	};
	const onCancel = () => {

	};

	return (
		<ButtonStrip>
			<Button
				loading={saving}
				dataTest="scorecard-save-button"
				disabled={saving}
				onClick={() => handleSubmit(onSave)()}
			>
				{saving
					? `${i18n.t("Saving")}...`
					: i18n.t("Save and exit")}
			</Button>
			{hasNext && (
				<Button
					loading={saving}
					dataTest="scorecard-save-and-continue-button"
					disabled={saving}
					onClick={() => handleSubmit(
						onSaveAndContinue
					)()}
				>
					{saving
						? `${i18n.t("Saving")}...`
						: i18n.t("Save and continue")}
				</Button>
			)}
			<Button onClick={onCancel}>
				{i18n.t("Exit without saving")}
			</Button>
		</ButtonStrip>
	);

}
