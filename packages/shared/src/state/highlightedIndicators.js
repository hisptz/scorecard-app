import {findIndex, get as _get, isEmpty} from "lodash";
import {atom, selector, selectorFamily} from "recoil";
import {InitialOrgUnits} from "./orgUnit";
import {PeriodResolverState} from "./period";
import {ScorecardViewState} from "./scorecard";
import {getHighlightedIndicatorsData} from "../services";

const HighlightedIndicatorsState = atom({
    key: "highlighted-indicators-state",
    default: selector({
        key: "highlighted-indicators-selector",
        get: async ({get}) => {
            const {orgUnits} = get(InitialOrgUnits);
            const periods = get(PeriodResolverState);
            const highlightedIndicators = get(
                ScorecardViewState("highlightedIndicators")
            );

            if (
                !isEmpty(orgUnits) &&
                !isEmpty(periods) &&
                !isEmpty(highlightedIndicators)
            ) {
                const data = await getHighlightedIndicatorsData({
                    orgUnits: [orgUnits[0]?.id],
                    periods: [periods[0]?.id],
                    highlightedIndicators: highlightedIndicators?.map(({id}) => id),
                });
                if (!isEmpty(data)) {
                    const {rows, headers} = data._data;
                    const dxIndex = findIndex(headers, ["name", "dx"]);
                    const valueIndex = findIndex(headers, ["name", "value"]);
                    const formattedData = {};
                    for (const row of rows) {
                        formattedData[row[dxIndex]] = row[valueIndex];
                    }

                    return formattedData;
                }

                return [];
            }
        },
    }),
});

const SingleHighlightedIndicatorState = selectorFamily({
    key: "highlighted-indicator-single-selector",
    get:
        (key) =>
            ({get}) => {
                return _get(get(HighlightedIndicatorsState), key);
            },
});

export {HighlightedIndicatorsState, SingleHighlightedIndicatorState};
