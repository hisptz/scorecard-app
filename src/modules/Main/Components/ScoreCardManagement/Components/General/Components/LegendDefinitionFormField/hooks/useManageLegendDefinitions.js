import i18n from '@dhis2/d2-i18n'
import {cloneDeep, findIndex, set} from "lodash";
import {useCallback, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {getDefaultLegendDefinitions, getNonDefaultLegendDefinitions} from "../../../utils/utils";

export function useManageLegendDefinitions() {
    const {watch, setValue, register, } = useFormContext();

    const legendDefinitions = watch("legendDefinitions");

    const nonDefaultLegendDefinitions = getNonDefaultLegendDefinitions(legendDefinitions);
    const defaultLegendDefinitions = getDefaultLegendDefinitions(legendDefinitions);

    const onAdd = useCallback(
        (value) => {
            const updatedDefinitions = cloneDeep(legendDefinitions);
            setValue("legendDefinitions", [...updatedDefinitions, value]);
        },
        [legendDefinitions, setValue],
    );

    const onDelete = (data) => {
        const updatedDefinitions = cloneDeep(legendDefinitions);
        const index = findIndex(updatedDefinitions, ({id: legendDefinitionId}) => legendDefinitionId === data.id);
        updatedDefinitions.splice(index, 1);
        setValue("legendDefinitions", updatedDefinitions);
    };

    const onEdit = (data) => {
        const updatedDefinitions = cloneDeep(legendDefinitions);
        const index = findIndex(updatedDefinitions, ({id: legendDefinitionId}) => legendDefinitionId === data.id);
        set(updatedDefinitions, index, data);
        setValue("legendDefinitions", updatedDefinitions);
    };

    useEffect(() => {
        register("legendDefinitions", {
            validate: (value) => {
                if (value?.length < 4) {
                    return i18n.t("At least two non-default legend definitions are required");
                }
                return true;
            },
        })
    }, [register]);


    return {
        nonDefaultLegendDefinitions,
        defaultLegendDefinitions,
        onAdd,
        onDelete,
        onEdit,
    }

}
