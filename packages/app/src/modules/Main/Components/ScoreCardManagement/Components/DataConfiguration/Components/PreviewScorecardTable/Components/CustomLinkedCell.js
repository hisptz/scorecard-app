import {LinkedCellSvg} from "@scorecard/shared";
import {generateRandomValues, getLegend,} from "@scorecard/shared";
import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {useFormContext} from "react-hook-form";


export default function CustomLinkedCell({top, bottom, orgUnit, period}) {
    const {
        legends: topLegends,
        showColors: showTopColors,
        displayArrows: topDisplayArrows,
        weight: topWeight,
        specificTargets: topSpecificTargets,
    } = top ?? {};
    const {
        legends: bottomLegends,
        showColors: showBottomColors,
        displayArrows: bottomDisplayArrows,
        weight: bottomWeight,
        specificTargets: bottomSpecificTargets,
    } = bottom ?? {};
    const {watch} = useFormContext();
    const legendDefinitions = watch("legendDefinitions");
    const topValue = useMemo(generateRandomValues, []);
    const bottomValue = useMemo(generateRandomValues, []);
    const {color: topColor} =
    getLegend(topValue, topLegends, {
        max: topWeight,
        specificTargets: topSpecificTargets,
        orgUnit,
        period,
        legendDefinitions
    }) ?? {};
    const {color: bottomColor} =
    getLegend(bottomValue, bottomLegends, {
        max: bottomWeight,
        specificTargets: bottomSpecificTargets,
        orgUnit,
        period,
        legendDefinitions
    }) ?? {};

    return (
        <td className="data-cell">
            <LinkedCellSvg
                topStatus={topDisplayArrows && "increasing"}
                bottomStatus={bottomDisplayArrows && "decreasing"}
                topColor={showTopColors ? topColor : undefined}
                bottomColor={showBottomColors ? bottomColor : undefined}
                bottomValue={bottomValue}
                topValue={topValue}
            />
        </td>
    );
}

CustomLinkedCell.propTypes = {
    bottom: PropTypes.object.isRequired,
    top: PropTypes.object.isRequired,
    orgUnit: PropTypes.string,
    period: PropTypes.string,
};
