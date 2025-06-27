import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useOrgUnitSelectionValue, usePeriodSelectionValue, useScorecardConfig, useUpdateDimensionState } from "@hisptz/dhis2-scorecard";
import { isEqual } from "lodash";
import { useCallback } from "react";

export function ScorecardResetButton() {
	const config = useScorecardConfig();
	const updateDimensionState = useUpdateDimensionState("all");
	const periodSelection = usePeriodSelectionValue();
	const orgUnitSelection = useOrgUnitSelectionValue();
	const resetScorecardState = useCallback(() => {
		updateDimensionState({
			orgUnitSelection: config.orgUnitSelection,
			periodSelection: config.periodSelection
		});

	}, [updateDimensionState, config.orgUnitSelection, config.periodSelection]);

	const disable = isEqual({ orgUnitSelection: config.orgUnitSelection, periodSelection: config.periodSelection }, { orgUnitSelection, periodSelection });

	return <Button disabled={disable} onClick={resetScorecardState} className="reset-button">{i18n.t("Reset")}</Button>;
}
