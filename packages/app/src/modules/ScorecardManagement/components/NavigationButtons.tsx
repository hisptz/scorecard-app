import { Button, ButtonStrip } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useFormContext } from "react-hook-form";
import useScorecardManagerNavigate from "../hooks/navigate";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "@dhis2/app-runtime";
import { useSaveScorecard } from "../hooks/save";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useDialog } from "@hisptz/dhis2-ui";
import { useRecoilState } from "recoil";
import { FormLoadingState } from "../state/loading";
import { PreviousButton } from "./PreviousButton";
import { NextButton } from "./NextButton";
import { SaveButton } from "./SaveButton";
import { useNavigateToScorecardView } from "../../../hooks/navigate";


export function StepNavigationButtons() {
	const { hasNext } = useScorecardManagerNavigate();


	return (
		<div style={{ gap: 8 }} className="row align-items-center">
			<PreviousButton />
			{
				hasNext && <NextButton />
			}
			{
				!hasNext && <SaveButton />
			}
		</div>
	);
}

export function NavigationButtons() {
	const { id } = useParams<{ id?: string }>();
	const navigate = useNavigate();
	const { handleSubmit, trigger, getValues } = useFormContext<ScorecardConfig>();
	const { hasNext, next, currentStep } = useScorecardManagerNavigate();
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));
	const { confirm } = useDialog();
	const [loadingState, setLoadingState] = useRecoilState(FormLoadingState);

	const navigateToView = useNavigateToScorecardView();

	const { save } = useSaveScorecard();

	const onSaveAndContinue = async () => {
		try {
			setLoadingState({
				button: "saveAndContinue",
				action: "saveAndContinue",
				loading: true
			});
			const formValid = await trigger(currentStep.fieldIds as any);
			if (formValid) {
				const config = getValues();
				await save(config);
				setLoadingState({
					button: "saveAndContinue",
					action: "saveAndContinue",
					loading: false
				});
				navigate(`/edit/${config.id}/${next?.id}`);
			} else {
				setLoadingState({
					button: "saveAndContinue",
					action: "saveAndContinue",
					loading: false
				});
				show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
			}
		} catch (err) {
			//Error is already shown in the save function.
		}
	};
	const onSave = async (config: ScorecardConfig) => {
		try {
			setLoadingState({
				button: "save",
				action: "save",
				loading: true
			});
			await save(config);
			setLoadingState({
				button: "save",
				action: "save",
				loading: false
			});
			navigateToView(config);
		} catch (err) {
			//Error is already shown in the save function.
		}
	};
	const onCancel = () => {
		confirm({
			title: i18n.t("Confirm form exit"),
			message: i18n.t("Are you sure you want to discard all changes and exit?"),
			confirmButtonText: i18n.t("Exit"),
			confirmButtonColor: "primary",
			onConfirm: () => {
				if (id) {
					navigateToView(getValues());
				} else {
					navigate("/");
				}
			}
		});
	};

	const saveLoading = loadingState?.button === "save" && loadingState?.loading;
	const saveAndContinueLoading = loadingState?.button === "saveAndContinue" && loadingState?.loading;

	return (
		<ButtonStrip>
			<Button
				loading={saveLoading}
				dataTest="scorecard-save-button"
				disabled={saveLoading}
				onClick={() => handleSubmit(onSave)()}
			>
				{saveLoading
					? `${i18n.t("Saving")}...`
					: i18n.t("Save and exit")}
			</Button>
			{hasNext && (
				<Button
					loading={saveAndContinueLoading}
					dataTest="scorecard-save-and-continue-button"
					disabled={saveAndContinueLoading}
					onClick={onSaveAndContinue}
				>
					{saveAndContinueLoading
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
