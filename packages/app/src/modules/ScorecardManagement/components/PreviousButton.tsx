import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import React from "react";
import { useRecoilState } from "recoil";
import { FormLoadingState } from "../state/loading";
import useScorecardManagerNavigate from "../hooks/navigate";
import { useFormContext } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@dhis2/app-runtime";


export function PreviousButton() {
	const { hasPrevious, previous, currentStep } = useScorecardManagerNavigate();
	const { trigger } = useFormContext<ScorecardConfig>();
	const navigate = useNavigate();

	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));

	const [loadingState, setLoadingState] = useRecoilState(FormLoadingState);
	const onPrevious = async () => {
		if (previous) {
			setLoadingState({
				action: "validate",
				loading: true,
				button: "previous"
			});
			const formValid = await trigger(currentStep.fieldIds as any);
			setLoadingState({
				action: "validate",
				loading: false,
				button: "previous"
			});
			if (formValid) {
				navigate(previous.id);
			} else {
				show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
			}
		}
	};

	const loading = loadingState?.button === "previous" && loadingState?.loading;


	return (
		<Button
			loading={loading}
			disabled={!hasPrevious || loading}
			onClick={onPrevious}
		>
			{loading ? i18n.t("Validating...") : i18n.t(
				`Previous: ${previous?.label ?? ""}`
			)}
		</Button>
	);
}
