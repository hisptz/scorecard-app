import { head, isEmpty, uniqBy } from "lodash";
import { atom, selector } from "recoil";
import { EngineState } from "../../../../../../../../../core/state/engine";
import { PeriodResolverState } from "../../../../../../../../../core/state/period";
import {
  ScorecardDataSourceState,
  ScorecardViewState,
} from "../../../../../../../../../core/state/scorecard";
import { UserState } from "../../../../../../../../../core/state/user";

const OrgUnitState = atom({
  key: "cell-analysis-orgUnit-state",
  default: selector({
    key: "cell-analysis-orgUnit-selector",
    get: ({ get }) => {
      return get(ScorecardViewState("orgUnitSelection"));
    },
  }),
});

const userSubUnitsQuery = {
  ou: {
    resource: "analytics",
    params: ({ pe, dx, ou }) => ({
      dimension: [`ou:${ou}`, `pe:${pe}`, `dx:${dx}`],
      skipData: true,
    }),
  },
};

export const InitialOrgUnits = selector({
  key: "cell-analysis-initial-org-units-resolver",
  get: async ({ get }) => {
    const {
      orgUnits,
      levels,
      groups,
      userOrgUnit,
      userSubUnit,
      userSubX2Unit,
    } = get(OrgUnitState);
    const periods = get(PeriodResolverState) ?? [];
    const dataHolders = get(ScorecardDataSourceState) ?? [];
    const { organisationUnits } = get(UserState);
    const engine = get(EngineState);
console.log("user org unit ",orgUnits, "levels ",levels)
console.log("comfirm user org ",userOrgUnit)
    let resolvedOrgUnits = orgUnits;

    if (!isEmpty(dataHolders) && !isEmpty(periods)) {
      if (userSubX2Unit) {
        const { ou } = await engine.query(userSubUnitsQuery, {
          variables: {
            pe: head(periods)?.id,
            dx: head(head(dataHolders)?.dataSources)?.id,
            ou: "USER_ORGUNIT_GRANDCHILDREN",
          },
        });
        resolvedOrgUnits = [
          ...resolvedOrgUnits,
          ...ou?.metaData?.dimensions?.ou?.map((ou) => ({ id: ou })),
        ];
      }
      if (userSubUnit) {
        const { ou } = await engine.query(userSubUnitsQuery, {
          variables: {
            pe: head(periods)?.id,
            dx: head(head(dataHolders)?.dataSources)?.id,
            ou: "USER_ORGUNIT_CHILDREN",
          },
        });
        resolvedOrgUnits = [
          ...resolvedOrgUnits,
          ...ou?.metaData?.dimensions?.ou?.map((ou) => ({ id: ou })),
        ];
      }
      if (userOrgUnit) {
        resolvedOrgUnits = [...resolvedOrgUnits, ...organisationUnits];
      }

      if (!isEmpty(levels)) {
        const { ou } = await engine.query(userSubUnitsQuery, {
          variables: {
            pe: head(periods)?.id,
            dx: head(head(dataHolders)?.dataSources)?.id,
            ou: levels?.map((level) => `LEVEL-${level}`)?.join(";"),
          },
        });
        resolvedOrgUnits = [
          ...resolvedOrgUnits,
          ...ou?.metaData?.dimensions?.ou?.map((ou) => ({ id: ou })),
        ];
      }

      if (!isEmpty(groups)) {
        const { ou } = await engine.query(userSubUnitsQuery, {
          variables: {
            pe: head(periods)?.id,
            dx: head(head(dataHolders)?.dataSources)?.id,
            ou: groups?.map((group) => `OU_GROUP-${group}`)?.join(";"),
          },
        });
        resolvedOrgUnits = [
          ...resolvedOrgUnits,
          ...ou?.metaData?.dimensions?.ou?.map((ou) => ({ id: ou })),
        ];
      }
    }

    return { orgUnits: uniqBy(resolvedOrgUnits, "id") };
  },
});

export { OrgUnitState };
