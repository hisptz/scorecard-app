import i18n from '@dhis2/d2-i18n'
import {useConfirmDialog} from "@hisptz/react-ui";
import {cloneDeep, findIndex, set} from "lodash";
import {useCallback, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {getDefaultLegendDefinitions, getNonDefaultLegendDefinitions} from "../../../utils/utils";
import {useResetLegends} from "./useResetLegends";

export function useManageLegendDefinitions() {
    const {watch, setValue, register,} = useFormContext();
    const {confirm} = useConfirmDialog();
    const {onResetLegends, shouldVerify} = useResetLegends()

    const legendDefinitions = watch("legendDefinitions");

    const nonDefaultLegendDefinitions = getNonDefaultLegendDefinitions(legendDefinitions);
    const defaultLegendDefinitions = getDefaultLegendDefinitions(legendDefinitions);

    const onAdd = useCallback(
        (value) => {
            const newLegendDefinitions = [...cloneDeep(legendDefinitions), value];

            function add() {
                setValue("legendDefinitions", newLegendDefinitions);
            }

            if (shouldVerify) {
                confirm({
                    title: i18n.t("Confirm legend reset"),
                    message: i18n.t("Adding a legend definition will reset all legends to their default values. Are you sure you want to continue?"),
                    onConfirm: () => {
                        add();
                        onResetLegends(newLegendDefinitions);
                    }
                })
            } else {
                add();
            }

        },
        [confirm, legendDefinitions, onResetLegends, setValue, shouldVerify],
    );

    const onDelete = useCallback((data) => {
        const updatedDefinitions = cloneDeep(legendDefinitions);
        const index = findIndex(updatedDefinitions, ({id: legendDefinitionId}) => legendDefinitionId === data.id);
        updatedDefinitions.splice(index, 1);

        function deleteDefinition() {
            setValue("legendDefinitions", updatedDefinitions);
        }

        if (shouldVerify) {
            confirm({
                title: `${i18n.t("Confirm legends reset")}`,
                message: `${i18n.t("Deleting this definition will reset all configured legends. Are you sure you want to delete this legend definition?")}`,
                onConfirm: () => {
                    deleteDefinition();
                    onResetLegends(updatedDefinitions);
                },
            })
        } else {
            deleteDefinition();
        }

    }, [confirm, legendDefinitions, onResetLegends, setValue, shouldVerify]);

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
