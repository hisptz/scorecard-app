import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import React from "react";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FormLoadingState } from "../state/loading";
import { useSaveScorecard } from "../hooks/save";
import { useAlert } from "@dhis2/app-runtime";


export function SaveButton() {
	const { handleSubmit } = useFormContext<ScorecardConfig>();
	const navigate = useNavigate();
	const [loadingState, setLoadingState] = useRecoilState(FormLoadingState);
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));

	const { save } = useSaveScorecard();

	const onSave = async (config: ScorecardConfig) => {
		try {
			await save(config);
			setLoadingState({
				action: "save",
				loading: false,
				button: "save"
			});
			navigate(`/view/${config.id}`);
		} catch (err) {

			//Error is already shown in the save function.
		}
	};

	return (
		<Button
			loading={(loadingState?.button === "save" && loadingState?.loading)}
			primary
			disabled={loadingState?.button === "save" && loadingState?.loading}
			onClick={() => {
				setLoadingState({
					action: "save",
					loading: true,
					button: "save"
				});
				handleSubmit(onSave, () => {
					show({ message: i18n.t("Form contains errors. Please fix them to continue."), type: { info: true } });
					setLoadingState({
						action: "save",
						loading: false,
						button: "save"
					});
				})();

			}}
			className="settings-next-button"
			dataTest="scorecard-admin-next-button"
		>
			{loadingState?.button === "save" && loadingState?.loading ? i18n.t("Saving...") : i18n.t("Save")}
		</Button>
	);
}
