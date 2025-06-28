import i18n from "@dhis2/d2-i18n";
import { cloneDeep, get as _get, isEmpty, set as _set } from "lodash";
import { atom, atomFamily, selectorFamily } from "recoil";
import { EngineState } from "./engine";
import {
	OrgUnitSelection,
	Scorecard,
	ScorecardAccess,
	ScorecardOptions,
} from "../models";
import { ScorecardAccessType } from "../constants";
import { getOrgUnitSelection, getScorecard } from "../services";
import { uid } from "../utils";

const defaultValue = {
	legendDefinitions: [
		{
			color: "#D3D3D3",
			name: i18n.t("N/A"),
			isDefault: true,
			id: "N/A",
		},
		{
			color: "#FFFFFF",
			name: i18n.t("No Data"),
			isDefault: true,
			id: "No Data",
		},
		{
			id: uid(),
			color: "#008000",
			name: i18n.t("Target Reached/ On Track"),
		},
		{
			id: uid(),
			color: "#FFFF00",
			name: i18n.t("Progress, but more effort required"),
		},
		{
			id: uid(),
			color: "#FF0000",
			name: i18n.t("Not on track"),
		},
	],
	options: new ScorecardOptions(),
	publicAccess: new ScorecardAccess({
		id: "public",
		type: "public",
		access: ScorecardAccessType.NO_ACCESS,
		displayName: "Public",
	}),
	orgUnitSelection: new OrgUnitSelection(),
	userGroupAccesses: [],
	userAccesses: [],
	highlightedIndicators: [],
};

const ScorecardIdState = atom<string | null>({
	key: "scorecard-id",
	default: null,
});

//This is to force a data re-fetch when a scorecard is updated

const ScorecardConfState = atomFamily({
	key: "scorecard-config",
	default: selectorFamily({
		key: "active-scorecard-config",
		get:
			(scorecardId: string) =>
			async ({ get }) => {
				const engine = get(EngineState);
				if (scorecardId) {
					const { scorecard, error } =
						(await getScorecard(scorecardId, engine)) ?? {};
					if (error) {
						if (error?.details?.httpStatusCode === 404) {
							throw {
								...error,
								title: i18n.t("Scorecard Not Found"),
								message: i18n.t(
									`Scorecard with id ${scorecardId} could not be found.`
								),
							};
						}
						throw error;
					}
					const orgUnitSelection = await getOrgUnitSelection(
						scorecard,
						engine
					);
					return { ...scorecard, orgUnitSelection };
				}
				return new Scorecard(defaultValue);
			},
	}),
});

const ScorecardConfigDirtyState = atomFamily({
	key: "scorecard-config-edit-state",
	default: selectorFamily({
		key: "scorecard-state-default",
		get:
			(path: string | string[]) =>
			async ({ get }) => {
				const scorecardId = get(ScorecardIdState);
				if (scorecardId && !isEmpty(scorecardId)) {
					return _get(get(ScorecardConfState(scorecardId)), path);
				}
				return _get(new Scorecard(defaultValue), path);
			},
	}),
});

const ScorecardConfigDirtySelector = selectorFamily({
	key: "scorecard-dirty-state-selector",
	get:
		({ key, path }: { key: string; path: string[] | string }) =>
		({ get }) => {
			return _get(get(ScorecardConfigDirtyState(key)), path);
		},
	set:
		({ key, path }) =>
		({ get, set }, newValue) => {
			const object = get(ScorecardConfigDirtyState(key));
			const newObject = _set(cloneDeep(object), path, newValue);
			set(ScorecardConfigDirtyState(key), newObject);
		},
});

const ScorecardConfigEditState = atom<{
	selectedDataHolderIndex?: number;
}>({
	key: "scorecard-edit-state",
	default: {},
});

export default ScorecardConfState;
export {
	ScorecardConfigEditState,
	ScorecardConfigDirtyState,
	ScorecardConfigDirtySelector,
};
