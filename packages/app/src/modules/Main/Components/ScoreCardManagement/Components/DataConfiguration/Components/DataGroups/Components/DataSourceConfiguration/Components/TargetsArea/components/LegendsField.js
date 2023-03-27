import {DHIS2FormField} from "@hisptz/dhis2-ui";
import {set} from "lodash";
import React from "react";


function autoSetAdjacentValues(data, index, highIsGood) {
    const newData = [...data];
    const updatedValue = newData[index];
    const previousValueIndex = highIsGood ? index - 1 : index + 1;
    const nextValueIndex = highIsGood ? index + 1 : index - 1;

    if (previousValueIndex >= 0) {
        set(newData, `${previousValueIndex}.startValue`, updatedValue?.endValue);
    }
    if (nextValueIndex < newData.length) {
        set(newData, `${nextValueIndex}.endValue`, updatedValue?.startValue);
    }
    return newData;
}

function editAtIndex(index, value, {data, highIsGood}) {
    const newData = [...data];
    set(newData, index, value);
    return autoSetAdjacentValues(newData, index, highIsGood);
}

export default function LegendsField({value, onChange, legendDefinitions, highIsGood}) {

    return (
        <DHIS2FormField
            value={value}
            legendDefinitions={legendDefinitions}
            highIsGood={highIsGood}
            valueType="LEGEND_MIN_MAX_GROUP"
            name="legend-min-max-group"
            onChange={onChange}
        />
    )
}
