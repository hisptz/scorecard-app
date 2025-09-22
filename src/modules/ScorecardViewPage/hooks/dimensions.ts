import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { useUpdateDimensionState } from "@hisptz/dhis2-scorecard";
import { getOrgUnitIdsFromOrgUnitSelection, getOrgUnitSelectionFromIds } from "@/shared";

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
	const setOrgUnitSelection = useUpdateDimensionState("orgUnit");
	const setPeriodSelection = useUpdateDimensionState("period");
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
			const updatedParams = new URLSearchParams(prev);
			updatedParams.set("ou", ous.join(";"));
			updatedParams.set("pe", periods.map(({ id }) => id).join(";"));
			return updatedParams;
		});
	};

	const setPeriod = useCallback(
		(periods: string[]) => {
			setPeriodSelection({
				periods: periods.map((periodId) => ({ id: periodId }))
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
