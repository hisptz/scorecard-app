import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import {
	useOrgUnitSelectionValue,
	usePeriodSelectionValue,
	useScorecardConfig,
} from "@hisptz/dhis2-scorecard";
import { isEqual } from "lodash";
import { useCallback } from "react";
import { useDimensions } from "../../../hooks/dimensions";

export function ScorecardResetButton() {
	const config = useScorecardConfig();
	const { setDimensions } = useDimensions();
	const periodSelection = usePeriodSelectionValue();
	const orgUnitSelection = useOrgUnitSelectionValue();
	const resetScorecardState = useCallback(() => {
		setDimensions({
			// @ts-expect-error Org unit select type issues
			orgUnitSelection: config.orgUnitSelection,
			periods: config.periodSelection.periods,
		});
	}, [config.orgUnitSelection, config.periodSelection]);

	//TODO: Not working, improve by checking specifics
	const disable =
		isEqual(config.orgUnitSelection, orgUnitSelection) &&
		isEqual(config.periodSelection.periods, periodSelection.periods);

	return (
		<Button
			disabled={disable}
			onClick={resetScorecardState}
			className="reset-button"
		>
			{i18n.t("Reset")}
		</Button>
	);
}
