import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { getOrgUnitIdsFromOrgUnitSelection, getOrgUnitSelectionFromIds } from "@scorecard/shared";
import { ScorecardState, useScorecardConfig, useScorecardSetState } from "@hisptz/dhis2-analytics";
import { isEqual } from "lodash";


export function useRawDimensions() {
	const [params] = useSearchParams();
	const noDimensionsSelected = useMemo(() => {
		return !params.get("ou") || !params.get("pe");
	}, [params.get("ou"), params.get("pe")]);

	const periods = useMemo(() => {
		return params.get("pe")?.split(";") ?? [];
	}, [params.get("pe")]);

	const orgUnits = useMemo(() => {
		return params.get("ou")?.split(";") ?? [];
	}, [params.get("ou")]);


	return {
		periods,
		orgUnits,
		noDimensionsSelected
	};

}


export function useDimensions() {
	const [params, setParams] = useSearchParams();
	const periods = useMemo(() => {
		if (params.get("pe") == null) {
			return undefined;
		}
		return params.get("pe")?.split(";") ?? [];
	}, [params.get("pe")]);
	const orgUnit = useMemo(() => {
		const orgUnits = params.get("ou")?.split(";") ?? [];
		return getOrgUnitSelectionFromIds(orgUnits);
	}, [params.get("ou")]);
	const setParam = useCallback(
		(key: string) => (value: string) => {
			setParams((prev) => {
				const updatedParams = new URLSearchParams(prev);
				updatedParams.set(key, value);
				return updatedParams;
			});
		},
		[setParams]
	);

	const setDimensions = ({
							   orgUnitSelection,
							   periods
						   }: {
		orgUnitSelection: OrgUnitSelection;
		periods: { id: string }[];
	}) => {
		const ous = getOrgUnitIdsFromOrgUnitSelection(orgUnitSelection);
		setParams((prev) => {
			if (!prev.get("ou") || !prev.get("pe")) {
				const updatedParams = new URLSearchParams(prev);
				updatedParams.set("ou", ous.join(";"));
				updatedParams.set("pe", periods.map(({ id }) => id).join(";"));
				return updatedParams;
			}
			return prev;
		});
	};

	const setPeriod = useCallback(
		(periods: string[]) => {
			setParam("pe")(periods.join(";"));
		},
		[setParam]
	);

	const setOrgUnit = (orgUnitSelection: OrgUnitSelection) => {
		const ous = getOrgUnitIdsFromOrgUnitSelection(orgUnitSelection);
		setParam("ou")(ous.join(";"));
	};

	const noDimensionsSelected = useMemo(() => {
		return !params.get("ou") || !params.get("pe");
	}, [params.get("ou"), params.get("pe")]);

	return {
		periods,
		orgUnit,
		noDimensionsSelected,
		setPeriod,
		setOrgUnit,
		setDimensions
	};
}


export function useSetInitialDimensions() {
	const config = useScorecardConfig();
	const { setDimensions } = useDimensions();

	useEffect(() => {
		if (config) {
			setDimensions({
				orgUnitSelection: config.orgUnitSelection as OrgUnitSelection,
				periods: config.periodSelection.periods
			});
		}
	}, [config]);
}


export function useApplyDimensions() {
	const setState = useScorecardSetState();
	const { orgUnit, periods } = useDimensions();

	useEffect(() => {
		setState((prevState) => {
			if (isEqual(prevState.periodSelection.periods, periods) && isEqual(prevState.orgUnitSelection, orgUnit)) {
				return prevState;
			} else {
				return {
					...prevState,
					periodSelection: {
						periods: periods?.map((id) => ({ id }))
					},
					orgUnitSelection: orgUnit
				} as ScorecardState;
			}
		});
	}, [orgUnit, periods]);

}
