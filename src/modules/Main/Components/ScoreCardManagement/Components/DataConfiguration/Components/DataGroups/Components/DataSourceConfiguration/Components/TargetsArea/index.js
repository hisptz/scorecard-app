import i18n from "@dhis2/d2-i18n";
import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import {RHFCustomInput} from "@hisptz/react-ui";
import {isEmpty} from "lodash";
import React, {useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import TargetsField
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm/Components/TargetsField";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../../../../../../shared/Components/CustomForm/models";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import PeriodSpecificTargetsModal from "../PeriodSpecificTargetsModal";


export default function TargetsArea({path}) {
    const {watch} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const [openConfigDialog, setOpenConfigDialog] = useState(false);
    const areSpecificTargetsSet = watch(`${path}.specificTargetsSet`);
    const specificTargets = useMemo(() => watch(`${path}.specificTargets`) ?? [], [watch]);

    const [selectedType, setSelectedType] = useState();


    useEffect(() => {
        if (selectedType && isEmpty(specificTargets)) {
            setOpenConfigDialog(true);
        }
    }, [selectedType, specificTargets]);

    return <div className="column gap-16">
        <RHFCustomInput
            valueType={DHIS2ValueTypes.TRUE_ONLY.name}
            label={i18n.t("Set Specific Targets")}
            name={`${path}.specificTargetsSet`}
        />
        {
            areSpecificTargetsSet ? <div className="column gap-16">
                    <SingleSelectField label={i18n.t("Specific target type")} selected={selectedType}
                                       onChange={({selected}) => setSelectedType(selected)}>
                        <SingleSelectOption value="period" label={i18n.t("Period")}/>
                        <SingleSelectOption value="orgUnit" label={i18n.t("Organisation Unit")}/>
                        <SingleSelectOption value="orgUnitLevel" label={i18n.t("Organisation Unit Level")}/>
                    </SingleSelectField>
                    <div className="column gap-8">
                        {
                            specificTargets?.map(target => (
                                <div key={`${target.id}-target-area`}>{target.type}</div>
                            ))
                        }
                    </div>
                    {
                        selectedType === "period" && openConfigDialog ?
                            <PeriodSpecificTargetsModal path={`${path}.${specificTargets.length}`} onClose={() => setOpenConfigDialog(false)}
                                                        open={openConfigDialog}
                                                        onUpdate={() => {

                                                        }}/> : null
                    }
                </div> :
                <div className="row">
                    <div className="column w-100 legend-settings-area">
                        <TargetsField
                            name={`${path}.legends`}
                            multipleFields={
                                legendDefinitions?.map(
                                    (legend) =>
                                        new FormFieldModel({
                                            id: legend.id,
                                            mandatory: false,
                                            name: legend.name,
                                            legendDefinition: legend,
                                            valueType: DHIS2ValueTypes.LEGEND_MIN_MAX.name,
                                        })
                                )
                            }
                        />
                    </div>
                </div>
        }
    </div>
}
