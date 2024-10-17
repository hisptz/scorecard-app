import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { getOrgUnitIdsFromOrgUnitSelection, getOrgUnitSelectionFromIds } from "@scorecard/shared";
import { useScorecardOrgUnitSelectionState, useScorecardPeriodState } from "@hisptz/dhis2-scorecard";


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
	const [, setOrgUnitSelection] = useScorecardOrgUnitSelectionState();
	const [, setPeriodSelection] = useScorecardPeriodState();
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
			setPeriodSelection((prev) => {
				return {
					...prev,
					periods: periods.map((periodId) => ({ id: periodId }))
				};
			});
			setParam("pe")(periods.join(";"));

		},
		[setParam]
	);

	const setOrgUnit = (orgUnitSelection: OrgUnitSelection) => {
		setOrgUnitSelection(orgUnitSelection as any);
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
