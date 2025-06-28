import { chunk, flatten } from "lodash";
import { atom, selector, selectorFamily } from "recoil";
import { EngineState } from "./engine";

import { getOrgUnitsFromAnalytics } from "../services";
import { useDataEngine } from "@dhis2/app-runtime";
import { Analytics } from "@hisptz/dhis2-utils";

const selectedOrgUnitsQuery = {
	analytics: {
		resource: "analytics",
		params: ({ ou, pe }: { ou: string[]; pe: string[] }) => ({
			dimension: [`ou:${ou.join(";")}`, `pe:${pe}`],
			skipData: true,
			hierarchyMeta: true,
			showHierarchy: true,
		}),
	},
};

const orgUnitLevelsQuery = {
	levels: {
		resource: "organisationUnitLevels",
		params: {
			fields: ["id", "displayName", "level"],
		},
	},
};
const orgUnitGroupsQuery = {
	groups: {
		resource: "organisationUnitGroups",
		params: {
			fields: ["id", "displayName"],
		},
	},
};

export const OrgUnitLevels = atom<Array<{ id: string; level: number }>>({
	key: "org-unit-levels",
	default: selector({
		key: "org-unit-levels-default",
		get: async ({ get }) => {
			const engine = get(EngineState);
			const { levels } = (await engine.query(orgUnitLevelsQuery)) as {
				levels: {
					organisationUnitLevels: Array<{
						id: string;
						level: number;
					}>;
				};
			};
			return levels?.organisationUnitLevels;
		},
	}),
});
export const OrgUnitGroups = atom({
	key: "org-unit-group",
	default: selector({
		key: "org-unit-group-default",
		get: async ({ get }) => {
			const engine = get(EngineState);
			const { groups } = (await engine.query(orgUnitGroupsQuery)) as {
				groups: {
					organisationUnitGroups: Array<{
						id: string;
						displayName: string;
					}>;
				};
			};
			return groups?.organisationUnitGroups;
		},
	}),
});

const getOrgUnits = async (
	engine: ReturnType<typeof useDataEngine>,
	orgUnitsIds: string[]
) => {
	const pe = new Date().getFullYear();
	// @ts-expect-error Query errors
	const { analytics } = (await engine.query(selectedOrgUnitsQuery, {
		variables: { ou: orgUnitsIds ?? [], pe },
	})) as unknown as {
		analytics: Analytics & {
			metaData: Analytics["metaData"] & {
				ouHierarchy: Record<string, string>;
				ouNameHierarchy: Record<string, string>;
			};
		};
	};

	return getOrgUnitsFromAnalytics(analytics);
};

export const SelectedOrgUnits = selectorFamily({
	key: "selected-org-units-resolver",
	get:
		(orgUnitsIds: string[]) =>
		async ({ get }) => {
			try {
				const engine = get(EngineState);
				const orgUnitsChunks = chunk(orgUnitsIds, 5);
				const orgUnits = await Promise.all(
					orgUnitsChunks.map((chunk) => getOrgUnits(engine, chunk))
				);
				return flatten(orgUnits);
			} catch (e) {
				console.error(e);
				return [];
			}
		},
});
