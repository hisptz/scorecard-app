import { Fn } from "@iapps/function-analytics";
import { isEmpty } from "lodash";
import { atom, selector } from "recoil";
import { InitialOrgUnits } from "./orgUnit";
import { ResolvedPeriodState } from "./period";

const DataState = selector({
  key: "cell-analysis-data",
  get: async ({ get }) => {
    const { orgUnits } = get(InitialOrgUnits);
    const periods = get(ResolvedPeriodState);
    const dataSources = get(DataSourceState);
    if (!isEmpty(orgUnits) && !isEmpty(periods) && !isEmpty(dataSources)) {
      return await new Fn.Analytics()
        .setOrgUnit(orgUnits?.map(({ id }) => id)?.join(";"))
        .setPeriod(periods?.map(({ id }) => id)?.join(";"))
        .setData(dataSources?.map(({ id }) => id)?.join(";"))
        .get();
    }
  },
});

const DataSourceState = atom({
  key: "cell-analysis-data-source",
  default: [],
});

export { DataState, DataSourceState };
