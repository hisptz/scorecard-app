import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import {
	getOrgUnitIdsFromOrgUnitSelection,
	getOrgUnitSelectionFromIds,
} from "@scorecard/shared";

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
		[setParams],
	);

	const setDimensions = ({
		orgUnitSelection,
		periods,
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
		[setParam],
	);

	const setOrgUnit = (orgUnitSelection: OrgUnitSelection) => {
		const ous = getOrgUnitIdsFromOrgUnitSelection(orgUnitSelection);
		setParam("ou")(ous.join(";"));
	};

	return {
		periods,
		orgUnit,
		setPeriod,
		setOrgUnit,
		setDimensions,
	};
}
