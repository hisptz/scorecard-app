import PropTypes from "prop-types";
import React from "react";
import {useRecoilValue} from "recoil";
import {
    OrgUnitLevels,
    ScorecardLegendDefinitionSelector,
    ScorecardViewState,
    SingleHighlightedIndicatorState
} from "../../../../../state";
import {getLegend} from "../../../../../utils";


export default function HighlightedIndicator({highlightedIndicator}) {
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const legendDefinitions = useRecoilValue(
        ScorecardViewState("legendDefinitions")
    );
    const defaultLegendDefinitions = useRecoilValue(
        ScorecardLegendDefinitionSelector(true)
    );
    const {displayName, legends, id, weight} = highlightedIndicator ?? {};
    const value = useRecoilValue(SingleHighlightedIndicatorState(id));
    const {color} =
    getLegend(value, legends, {
        max: weight,
        defaultLegends: defaultLegendDefinitions,
        orgUnitLevels,
        dataOrgUnitLevel: 1, //TODO:Fix this,
        legendDefinitions,
    }) ?? {};
    return (
        <div
            style={{
                background: "white",
                border: "1px solid rgb(232, 237, 242)",
                margin: 8,
            }}
        >
            <div
                id={"test-highlighted-indicator"}
                className="row flex-1 space-between align-items-center"
            >
                <p style={{margin: 0, padding: "0 8px", fontSize: 14}}>
                    {displayName}
                </p>
                <div
                    style={{
                        width: 60,
                        minHeight: "100%",
                        background: color,
                        padding: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <p style={{fontSize: 14, margin: 0}}>{value}</p>
                </div>
            </div>
        </div>
    );
}

HighlightedIndicator.propTypes = {
    highlightedIndicator: PropTypes.object.isRequired,
};
