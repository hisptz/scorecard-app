import React from "react";
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../../General/utils/utils";
import useTargetsManage from "../../../hooks/useTargetsManage";
import LegendsField from "./LegendsField";

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

    return (<LegendsField
        highIsGood={highIsGood}
        legendDefinitions={legendDefinitions}
        value={value}
        onChange={onChange}
    />);
}
