import i18n from '@dhis2/d2-i18n'
import {Button, InputField} from "@dhis2/ui";
import {PeriodSelectorModal} from "@hisptz/react-ui";
import {Period} from "@iapps/period-utilities";
import {filter, isEmpty} from 'lodash'
import React, {useMemo, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardConfigDirtyState} from "../../../../../../../core/state/scorecard";

export default function PeriodSelector() {
    const selectedPeriodType = useRecoilValue(ScorecardConfigDirtyState("periodType"));
    const [periodSelection, setPeriodSelection] = useRecoilState(ScorecardConfigDirtyState("periodSelection"));
    const [periodSelectorHide, setPeriodSelectorHide] = useState(true);

    const periodsTypesToExclude = useMemo(() => {
        if (selectedPeriodType) {
            const periodTypes = new Period().get()?._periodType?._periodTypes;
            return filter(periodTypes, (periodType) => periodType.id !== selectedPeriodType)?.map(({id}) => id);
        }
        return [];
    }, [selectedPeriodType]);

    return <div style={{display: "flex", gap: 16, alignItems: "end", width: '100%'}}>
        <div className="w-50">
            <InputField
                fullWidth
                name={"period"}
                label={"Period"}
                value={periodSelection?.periods?.map(({name}) => name).join(", ")}
                disabled
            />
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
        <Button
            onClick={() => setPeriodSelectorHide(false)}>{!isEmpty(periodSelection.periods) ? i18n.t("Change Periods") : i18n.t("Select Periods")}</Button>
    </div>
}
