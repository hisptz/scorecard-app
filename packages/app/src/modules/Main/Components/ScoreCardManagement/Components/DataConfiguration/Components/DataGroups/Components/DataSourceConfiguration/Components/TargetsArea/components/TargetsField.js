import {DHIS2FormField} from "@hisptz/dhis2-ui";
import React from "react";
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../../General/utils/utils";
import useTargetsManage from "../../../hooks/useTargetsManage";

export default function TargetsField(props) {
    const {
        name,
        path
    } = props ?? {};
    const {watch, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const highIsGood = watch(`${path}.highIsGood`);


    useTargetsManage(props);

    const onChange = (value) => {
        setValue(name, value);
    };

    const value = watch(name);

    return (<DHIS2FormField
        valueType={'LEGEND_MIN_MAX_GROUP'}
        highIsGood={highIsGood}
        legendDefinitions={legendDefinitions}
        value={value}
        onChange={onChange}
    />);
}
