import {useCallback} from "react";
import {useFormContext} from "react-hook-form";
import ScorecardOptions from "../../../../../../../core/models/scorecardOptions";


export default function useOptionsManage(){
    const {watch, setValue} = useFormContext();

    const scorecardOptions = watch("options");

    const setScorecardOptions = useCallback(
        (updatedOptions) => {
            setValue("options", updatedOptions);
        },
        [setValue],
    );

    const onChange = (key) => (newValue) => {
        setScorecardOptions((ScorecardOptions.set(
            scorecardOptions,
            key,
            newValue?.checked ?? newValue
        )));
    };

    const onAverageChange = (value) => {
        setScorecardOptions(ScorecardOptions.set(scorecardOptions, "averageDisplayType", value)
        );
    };

    return{
        onAverageChange,
        onChange,
        scorecardOptions
    }
}
