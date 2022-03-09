import React from "react";
import {useFormContext} from "react-hook-form";
import LegendsField
    from "hisptz-scorecard/src/modules/Main/Components/ScoreCardManagement/Components/DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/Components/TargetsArea/components/LegendsField";
import useTargetsManage
    from "hisptz-scorecard/src/modules/Main/Components/ScoreCardManagement/Components/DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/hooks/useTargetsManage";
import {
    getNonDefaultLegendDefinitions
} from "hisptz-scorecard/src/modules/Main/Components/ScoreCardManagement/Components/General/utils/utils";

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

