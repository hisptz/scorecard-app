import {CustomInput} from "@hisptz/react-ui";
import {set} from "lodash";
import React from "react";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../../shared/Components/CustomForm/constants";


function editAtIndex(index, value, data) {
    const newData = [...data];
    set(newData, index, value);
    return newData;
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
