import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { getInitialStateFromConfig, scorecardStateAtom, useScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { isEqual } from "lodash";

export function ScorecardResetButton() {
	const config = useScorecardConfig();
	const defaultState = getInitialStateFromConfig(config);
	const currentState = useRecoilValue(scorecardStateAtom);
	const resetScorecardState = useRecoilCallback(({ set }) => () => {
		set(scorecardStateAtom, defaultState);
	});

	const disable = isEqual(currentState, defaultState);

	return <Button disabled={disable} onClick={resetScorecardState} className="reset-button">{i18n.t("Reset")}</Button>;
}
