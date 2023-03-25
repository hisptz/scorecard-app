import {chunk, compact, find, flatten, isEmpty, reduce, sortBy, uniqBy} from "lodash";
import {atom, selector, selectorFamily} from "recoil";
import {EngineState} from "./engine";
import {PeriodResolverState} from "./period";
import {ScorecardViewState} from "./scorecard";
import {UserState} from "./user";
import {getHoldersFromGroups} from "../utils";
import {getOrgUnitsFromAnalytics} from "../services";

const {atomFamily} = require("recoil");

const orgUnitQuery = {
    orgUnit: {
        resource: "organisationUnits",
        id: ({id}) => id,
        params: {
            fields: ["id", "displayName", "path", "level"],
        },
    },
};

const orgUnitChildrenQuery = {
    analytics: {
        resource: "analytics",
        params: ({id, level}) => ({
            dimension: [`ou:${id};LEVEL-${level}`, `pe:${new Date().getFullYear()}`],
            skipData: true,
            hierarchyMeta: true,
            showHierarchy: true,
        }),
    },
};

const selectedOrgUnitsQuery = {
    analytics: {
        resource: "analytics",
        params: ({ou, pe}) => ({
            dimension: [
                `ou:${ou.join(";")}`,
                `pe:${pe}`,
            ],
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

export const OrgUnitLevels = atom({
    key: "org-unit-levels",
    default: selector({
        key: "org-unit-levels-default",
        get: async ({get}) => {
            const engine = get(EngineState);
            const {levels} = await engine.query(orgUnitLevelsQuery);
            return levels?.organisationUnitLevels;
        },
    }),
});
export const OrgUnitGroups = atom({
    key: "org-unit-group",
    default: selector({
        key: "org-unit-group-default",
        get: async ({get}) => {
            const engine = get(EngineState);
            const {groups} = await engine.query(orgUnitGroupsQuery);
            return groups?.organisationUnitGroups;
        },
    }),
});

export const OrgUnit = selectorFamily({
    key: "orgUnitSelector",
    get:
        (id) =>
            async ({get}) => {
                try {
                    const engine = get(EngineState);
                    const {orgUnit} = await engine.query(orgUnitQuery, {
                        variables: {id},
                    });
                    return orgUnit;
                } catch (e) {
                    return {};
                }
            },
});

export const OrgUnitPathState = atomFamily({
    key: "orgUnitPath",
    default: selectorFamily({
        key: "orgUnitPathSelector",
        get:
            (path = "") =>
                async ({get}) => {
                    const orgUnits = compact(path.split("/"));
                    const orgUnitNames = sortBy(
                        get(SelectedOrgUnits(orgUnits)),
                        "level"
                    )?.map(({displayName}) => displayName);
                    return orgUnitNames.join("/");
                },
    }),
});

export const OrgUnitChildren = selectorFamily({
    key: "org-unit-children",
    get:
        (orgUnitId) =>
            async ({get}) => {
                const engine = get(EngineState);
                const parentOrgUnit = get(OrgUnit(orgUnitId));
                if (parentOrgUnit) {
                    const {analytics} = await engine.query(orgUnitChildrenQuery, {
                        variables: {id: orgUnitId, level: parentOrgUnit.level + 1},
                    });
                    return getOrgUnitsFromAnalytics(analytics) ?? [];
                }
            },
});

export const LowestOrgUnitLevel = selector({
    key: "last-org-unit-level",
    get: ({get}) => {
        const orgUnitLevels = get(OrgUnitLevels);
        return reduce(orgUnitLevels, (acc, level) => (level.level > acc.level ? level : acc));
    },
});

export const InitialOrgUnits = selector({
    key: "initial-org-units-resolver",
    get: async ({get}) => {
        const {
            orgUnits,
            levels,
            groups,
            userOrgUnit,
            userSubUnit,
            userSubX2Unit,
        } = get(ScorecardViewState("orgUnitSelection")) ?? {};
        const periods = get(PeriodResolverState) ?? [];
        const orgUnitLevels = get(OrgUnitLevels);
        const {dataGroups} = get(ScorecardViewState("dataSelection")) ?? {};
        const dataHolders = getHoldersFromGroups(dataGroups) ?? [];
        const {organisationUnits} = get(UserState);

        let resolvedOrgUnits = orgUnits;

        if (!isEmpty(dataHolders) && !isEmpty(periods)) {
            if (userSubX2Unit) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    {id: "USER_ORGUNIT_GRANDCHILDREN"}
                ];
            }
            if (userSubUnit) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    {id: "USER_ORGUNIT_CHILDREN"}
                ];
            }
            if (userOrgUnit) {
                resolvedOrgUnits = [...resolvedOrgUnits, ...organisationUnits];
            }

            if (!isEmpty(levels)) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    ...(levels?.map((level) => ({id: `LEVEL-${find(orgUnitLevels, {id: level})?.level}`})) ?? []),
                ];
            }

            if (!isEmpty(groups)) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    ...(groups?.map((group) => ({id: `OU_GROUP-${group}`})) ?? []),
                ];
            }
        }

        return {orgUnits: uniqBy(resolvedOrgUnits, "id")};
    },
});

const getOrgUnits = async (engine, orgUnitsIds) => {

    const pe = new Date().getFullYear();

    const {analytics} = await engine.query(selectedOrgUnitsQuery, {
        variables: {ou: orgUnitsIds ?? [], pe},
    });

    return getOrgUnitsFromAnalytics(analytics);
}

export const SelectedOrgUnits = selectorFamily({
    key: "selected-org-units-resolver",
    get:
        (orgUnitsIds) =>
            async ({get}) => {
                try {
                    const engine = get(EngineState);
                    const orgUnitsChunks = chunk(orgUnitsIds, 5);
                    const orgUnits = await Promise.all(orgUnitsChunks.map((chunk) => getOrgUnits(engine, chunk)));
                    return flatten(orgUnits);

                } catch (e) {
                    console.error(e);
                    return [];
                }
            },
});
