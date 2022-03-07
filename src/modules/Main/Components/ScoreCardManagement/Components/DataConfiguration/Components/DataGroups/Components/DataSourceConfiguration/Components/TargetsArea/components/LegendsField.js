import {CustomInput} from "@hisptz/react-ui";
import {set} from "lodash";
import React from "react";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../../shared/Components/CustomForm/constants";


function autoSetAdjacentValues(data, index) {
    const newData = [...data];
    const updatedValue = newData[index];
    const previousValueIndex = index - 1;
    const nextValueIndex = index + 1;

    if (previousValueIndex >= 0) {
        set(newData, `${previousValueIndex}.startValue`, updatedValue?.endValue);
    }
    if (nextValueIndex < newData.length) {
        set(newData, `${nextValueIndex}.endValue`, updatedValue?.startValue);
    }
    return newData;
}

function editAtIndex(index, value, data) {
    const newData = [...data];
    set(newData, index, value);
    return autoSetAdjacentValues(newData, index);
}

export default function LegendsField({value, onChange, legendDefinitions}) {


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
                        onChange([...editAtIndex(index, legendValue, value)]);
                    }
                }}
                valueType={DHIS2ValueTypes.LEGEND_MIN_MAX.name}

            />
        })
    )
}
