import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ScorecardConfig, useUpdateDimensionState } from "@hisptz/dhis2-scorecard";
import { isEmpty } from "lodash";


export function ScorecardDimensionUpdate({ scorecardConfig }: { scorecardConfig: ScorecardConfig }) {
	const isMounted = useRef(false);
	const setOrgUnits = useUpdateDimensionState("orgUnit");
	const setPeriods = useUpdateDimensionState("period");
	const [searchParams] = useSearchParams();
	const { orgUnits, periods } = useMemo(() => {
		const orgUnits = searchParams.get("ou")?.split(",").map((id) => ({ id })) ?? [];
		const periods = searchParams.get("pe")?.split(",").map((id) => ({ id })) ?? [];

		return {
			orgUnits,
			periods
		};
	}, [searchParams]);


	useEffect(() => {
		if (isMounted.current) {
			if (!isEmpty(orgUnits)) {
				setOrgUnits({ orgUnits });
			} else {
				setOrgUnits({
					...scorecardConfig.orgUnitSelection
				});
			}
			if (!isEmpty(periods)) {
				setPeriods({ periods });
			} else {
				setPeriods({
					...scorecardConfig.periodSelection
				});
			}
		} else {
			isMounted.current = true;
		}
	}, [orgUnits, periods]);

	return null;
}
