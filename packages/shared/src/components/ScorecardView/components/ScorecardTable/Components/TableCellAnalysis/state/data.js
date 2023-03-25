import {AnalyticsResult, Fn} from "@iapps/function-analytics";
import {isEmpty} from "lodash";
import {atom, selector} from "recoil";
import {InitialOrgUnits} from "./orgUnit";
import {ResolvedPeriodState} from "./period";
import {EngineState} from "../../../../../../../state";
import {getCustomFunctionAnalytics} from "../../../../../../../utils";

const DataState = selector({
    key: "cell-analysis-data",
    get: async ({get}) => {
        const {orgUnits} = get(InitialOrgUnits);
        const periods = get(ResolvedPeriodState);
        const dataSources = get(DataSourceState);
        const engine = get(EngineState);
        if (!isEmpty(orgUnits) && !isEmpty(periods) && !isEmpty(dataSources)) {
            const dataSource = dataSources[0];
            if (dataSource.type === "customFunction") {
                return new AnalyticsResult(await getCustomFunctionAnalytics(engine, {
                    functions: [dataSource.id],
                    orgUnits: orgUnits.map(({id}) => id),
                    periods: periods?.map(({id}) => id)
                }))
            } else {
                return await new Fn.Analytics()
                    .setDimension("ou", `${orgUnits.map(({id}) => id).join(";")}`)
                    .setPeriod(periods?.map(({id}) => id)?.join(";"))
                    .setData(dataSources?.map(({id}) => id)?.join(";"))
                    .get();
            }
        }
    },
});

const DataSourceState = atom({
    key: "cell-analysis-data-source",
    default: [],
});

export {DataState, DataSourceState};
