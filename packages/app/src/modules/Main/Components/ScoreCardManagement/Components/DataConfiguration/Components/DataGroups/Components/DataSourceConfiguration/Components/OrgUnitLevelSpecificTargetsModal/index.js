import {FormFieldModel} from "@scorecard/shared";
import {DHIS2ValueTypes} from "@scorecard/shared";
import PropTypes from 'prop-types'
import React from 'react'
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import LevelTargetsField from "../TargetsArea/components/LevelTargetsField";

export default function OrgUnitLevelSpecificTargets({path}) {
    const {watch, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const weight = watch(`${path}.weight`);
    const highIsGood = watch(`${path}.highIsGood`);
    const defaultLegends = watch(`${path}.legends`);


    return (
        <LevelTargetsField
            multipleFields={
                legendDefinitions?.map(
                    (legend) =>
                        new FormFieldModel({
                            id: legend.id,
                            mandatory: false,
                            name: legend.name,
                            legendDefinition: legend,
                            valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name,
                        })
                )
            }
            value={defaultLegends}
            onChange={({value}) => {
                setValue(`${path}.legends`, value);
            }}
            legends={defaultLegends}
            highIsGood={highIsGood}
            weight={weight}
            path={path}
            name={"legends"}
        />
    )
}
OrgUnitLevelSpecificTargets.propTypes = {
    path: PropTypes.string.isRequired,
};
