import {SingleCellSvg} from "@scorecard/shared";
import {OrgUnitLevels, UserState} from "@scorecard/shared";
import {generateRandomValues, getLegend} from "@scorecard/shared";
import {head} from "lodash";
import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import CustomLinkedCell from "./CustomLinkedCell";

export default function PreviewCustomCell({config}) {
    const {watch} = useFormContext();
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const {organisationUnits} = useRecoilValue(UserState);
    const legendDefinitions = watch("legendDefinitions");
    const hasLinked = config?.dataSources?.length > 1;
    const [top, bottom] = config?.dataSources ?? [];
    const {legends, showColors, id, displayArrows, weight, specificTargets} = top ?? {};
    const value = useMemo(generateRandomValues, []);
    const orgUnit = head(organisationUnits)?.id;
    const period = new Date().getFullYear();
    const legend = getLegend(value, legends, {
        max: weight,
        orgUnitLevels,
        dataOrgUnitLevel: 1,
        legendDefinitions,
        specificTargets,
        orgUnit,
        period
    });

    return hasLinked ? (
        <CustomLinkedCell orgUnit={orgUnit} period={period} bottom={bottom} top={top}
                          specificTargets={specificTargets}/>
    ) : (
        <td
            width={"100px"}
            className="data-cell"
            align="center"
            key={`${id}-data`}
            id={id}
        >
            <SingleCellSvg
                status={displayArrows && "decreasing"}
                color={showColors ? legend?.color : undefined}
                value={value}
            />
        </td>
    );
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired,
};
