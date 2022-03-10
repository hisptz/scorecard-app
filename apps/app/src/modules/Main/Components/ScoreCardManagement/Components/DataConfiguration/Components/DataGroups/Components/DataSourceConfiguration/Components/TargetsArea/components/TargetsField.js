import React from "react";
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../../General/utils/utils";
import useTargetsManage from "../../../hooks/useTargetsManage";
import LegendsField from "./LegendsField";

export default function TargetsField(props) {
    const {
        name,
    } = props ?? {};
    const {watch, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));

    useTargetsManage(props);

    const onChange = (value) => {
        setValue(name, value);
    };

    const value = watch(name);

    return (<LegendsField
        legendDefinitions={legendDefinitions}
        value={value}
        onChange={onChange}
    />);
}
