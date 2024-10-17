import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useAlert } from "@dhis2/app-runtime";
import { useNavigate } from "react-router-dom";
import useScorecardManagerNavigate from "../hooks/navigate";
import { useRecoilState } from "recoil";
import { FormLoadingState } from "../state/loading";


export function NextButton() {

	const { trigger } = useFormContext<ScorecardConfig>();
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));
	const navigate = useNavigate();
	const { next, currentStep } = useScorecardManagerNavigate();
	const [loadingState, setLoadingState] = useRecoilState(FormLoadingState);


	const onNext = async () => {
		if (next) {
			setLoadingState({
				action: "validate",
				loading: true,
				button: "next"
			});
			const formValid = await trigger(currentStep.fieldIds as any);
			setLoadingState({
				action: "validate",
				loading: false,
				button: "next"
			});

			if (formValid) {
				navigate(next.id);
			} else {
				show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
			}
		}
	};

	return (
		<Button
			loading={loadingState?.button === "next" && loadingState?.loading}
			primary
			disabled={loadingState?.button === "next" && loadingState?.loading}
			onClick={onNext}
			className="settings-next-button"
			dataTest="scorecard-admin-next-button"
		>
			{loadingState?.button === "next" && loadingState?.loading ? i18n.t("Validating...") : `${i18n.t("Next")}: ${next!.label}`}
		</Button>
	)
}
