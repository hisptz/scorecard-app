import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { compact, isEmpty } from "lodash";
import { getOrgUnitIdsFromOrgUnitSelection } from "@scorecard/shared";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";


export function useGetScorecardViewLink() {

	return useCallback((config: Pick<ScorecardConfig, "id" | "orgUnitSelection" | "periodSelection">) => {
		const { periodSelection, orgUnitSelection } = config;
		const searchParams = new URLSearchParams();
		const orgUnits = compact(getOrgUnitIdsFromOrgUnitSelection(orgUnitSelection as OrgUnitSelection));
		const periods = compact(periodSelection.periods?.map(({ id }) => id));

		if (!isEmpty(periods)) {
			searchParams.set("pe", periods.join(";"));
		}
		if (!isEmpty(orgUnits)) {
			searchParams.set("ou", orgUnits.join(";"));
		}

		return `/view/${config.id}?${searchParams.toString()}`;
	}, []);
}

export function useNavigateToScorecardView() {
	const navigate = useNavigate();
	return useCallback((config: Pick<ScorecardConfig, "id" | "orgUnitSelection" | "periodSelection">) => {
		const url = useGetScorecardViewLink()(config);
		navigate(url);
	}, [navigate]);
}
