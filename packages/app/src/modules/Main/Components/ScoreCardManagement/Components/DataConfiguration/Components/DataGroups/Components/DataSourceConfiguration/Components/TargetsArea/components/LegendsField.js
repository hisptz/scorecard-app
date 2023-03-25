import {CustomInput} from "@hisptz/react-ui";
import {DHIS2ValueTypes} from "@scorecard/shared";
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
        legendDefinitions?.map((definition, index) => {
            return <CustomInput
                legendDefinition={definition}
                label={""}
                key={`${definition.id}_${index}`}
                input={{
                    name: `legend_${definition.id}`,
                    label: "",
                    value: value[index],
                    onChange: (legendValue) => {
                        onChange([...editAtIndex(index, legendValue, {data: value, highIsGood})]);
                    }
                }}
                valueType={DHIS2ValueTypes.LEGEND_MIN_MAX.name}

            />
        })
    )
}
