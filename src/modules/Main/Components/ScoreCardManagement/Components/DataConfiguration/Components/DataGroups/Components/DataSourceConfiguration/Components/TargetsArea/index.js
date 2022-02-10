import i18n from "@dhis2/d2-i18n";
import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import {RHFCustomInput} from "@hisptz/react-ui";
import {isEmpty} from "lodash";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import TargetsField
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm/Components/TargetsField";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../../../../../../shared/Components/CustomForm/models";
import {generateLegendDefaults, uid} from "../../../../../../../../../../../../shared/utils/utils";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import PeriodSpecificTargetsModal from "../PeriodSpecificTargetsModal";
import SpecificTargetView from "./components/SpecificTargetView";


export default function TargetsArea({path}) {
    const {watch, setValue, getValues} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const [openConfigDialog, setOpenConfigDialog] = useState(false);
    const areSpecificTargetsSet = watch(`${path}.specificTargetsSet`);
    const specificTargets = watch(`${path}.specificTargets`)

    const [selectedType, setSelectedType] = useState();


    useEffect(() => {
        if (selectedType && isEmpty(specificTargets[0]?.items)) {
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
                                       onChange={({selected}) => {
                                           setSelectedType(selected);
                                           setValue(`${path}.specificTargets`, [{
                                               id: uid(),
                                               type: selected,
                                               items: [],
                                               legends: generateLegendDefaults(legendDefinitions, getValues(`${path}.weight`, getValues(`${path}.highIsGood`)))
                                           }]);
                                       }}>
                        <SingleSelectOption value="period" label={i18n.t("Period")}/>
                        <SingleSelectOption value="orgUnit" label={i18n.t("Organisation Unit")}/>
                        <SingleSelectOption value="orgUnitLevel" label={i18n.t("Organisation Unit Level")}/>
                    </SingleSelectField>
                    <div className="column gap-8">
                        {
                            specificTargets?.map(target => (
                                <SpecificTargetView legendDefinitions={legendDefinitions}
                                                    onUpdate={() => setOpenConfigDialog(true)} key={`${target.id}-view`}
                                                    specificTarget={target}/>
                            ))
                        }
                    </div>
                    {
                        selectedType === "period" && openConfigDialog && !isEmpty(specificTargets) ?
                            <PeriodSpecificTargetsModal
                                specificTarget={specificTargets[0]}
                                onClose={() => setOpenConfigDialog(false)}
                                open={openConfigDialog}
                                onUpdate={(target) => {
                                    console.log(target)
                                    setOpenConfigDialog(false);
                                    setValue(`${path}.specificTargets`, [target]);
                                }}
                            /> : null
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
