import i18n from '@dhis2/d2-i18n'
import {Button, InputField, Tooltip} from "@dhis2/ui";
import {PeriodSelectorModal} from "@hisptz/react-ui";
import {Period} from "@iapps/period-utilities";
import {filter, isEmpty} from 'lodash'
import React, {useCallback, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";

export default function PeriodSelector() {
    const {watch, setValue} = useFormContext();
    const selectedPeriodType = watch("periodType");

    const periodSelection = watch("periodSelection");

    const setPeriodSelection = useCallback((updatedPeriodSelection) => setValue("periodSelection", updatedPeriodSelection), [setValue]);

    const [periodSelectorHide, setPeriodSelectorHide] = useState(true);

    const periodsTypesToExclude = useMemo(() => {
        if (selectedPeriodType) {
            if (selectedPeriodType !== periodSelection.type) {
                setValue("periodSelection", {periods: [], type: selectedPeriodType});
            }
            const periodTypes = new Period().get()?._periodType?._periodTypes;
            return filter(periodTypes, (periodType) => periodType.id !== selectedPeriodType)?.map(({id}) => id);
        }
        return [];
    }, [selectedPeriodType, setValue]);

    return <div style={{display: "flex", gap: 16, alignItems: "end", width: '100%'}}>
        <div className="w-50">
            <Tooltip content={<div>{periodSelection?.periods?.map(({name}) => name).join(",\n")}</div>}>
                <InputField
                    fullWidth
                    name={"period"}
                    label={i18n.t("Period")}
                    value={periodSelection?.periods?.map(({name}) => name).join(", ")}
                    disabled
                />
            </Tooltip>
        </div>
        {
            !periodSelectorHide && <PeriodSelectorModal
                selectedPeriods={periodSelection?.periods}
                excludedPeriodTypes={periodsTypesToExclude}
                onClose={() => setPeriodSelectorHide(true)}
                hide={periodSelectorHide}
                onUpdate={(periods) => {
                    setPeriodSelection({periods: periods?.map(({id, name}) => ({id, name})), type: selectedPeriodType});
                    setPeriodSelectorHide(true);
                }}
            />
        }
        <Button dataTest="config-open-period-selector-button"
                onClick={() => setPeriodSelectorHide(false)}>{!isEmpty(periodSelection.periods) ? i18n.t("Change Periods") : i18n.t("Select Periods")}</Button>
    </div>
}
