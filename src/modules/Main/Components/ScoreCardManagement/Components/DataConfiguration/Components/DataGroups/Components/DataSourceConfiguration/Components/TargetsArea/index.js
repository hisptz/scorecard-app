import i18n from "@dhis2/d2-i18n";
import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import {RHFCustomInput} from "@hisptz/react-ui";
import {head, isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useEffect, useState, Suspense} from "react";
import {useFormContext} from "react-hook-form";
import TargetsField
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm/Components/TargetsField";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../../../../../../shared/Components/CustomForm/models";
import {generateLegendDefaults, uid} from "../../../../../../../../../../../../shared/utils/utils";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import OrgUnitLevelSpecificTargets from "../OrgUnitLevelSpecificTargetsModal";
import OrgUnitSpecificTargetsModal from "../OrgUnitSpecificTargetsModal";
import PeriodSpecificTargetsModal from "../PeriodSpecificTargetsModal";
import {OrgUnitSpecificTargetView, PeriodSpecificTargetView} from "./components/SpecificTargetView";

function getSelectedType(specificTargets, specificTargetSet) {
    if (!isEmpty(specificTargets) && specificTargetSet) {
        return head(specificTargets)?.type;
    }
    if (specificTargetSet) {
        return "orgUnitLevel";
    }
    return null;
}

export default function TargetsArea({path}) {
    const {watch, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const [openConfigDialog, setOpenConfigDialog] = useState(false);
    const areSpecificTargetsSet = watch(`${path}.specificTargetsSet`);
    const specificTargets = watch(`${path}.specificTargets`)
    const defaultLegends = watch(`${path}.legends`);
    const weight = watch(`${path}.weight`);
    const highIsGood = watch(`${path}.highIsGood`);

    const [selectedType, setSelectedType] = useState(getSelectedType(specificTargets, areSpecificTargetsSet));


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
                                           if (selected === "orgUnitLevel") {
                                               setSelectedType(selected);
                                               setValue(`${path}.legends`, [])
                                               setValue(`${path}.specificTargets`, [])
                                               return;
                                           }
                                           setSelectedType(selected);
                                           setValue(`${path}.legends`, generateLegendDefaults(legendDefinitions, weight, highIsGood))

                                           setValue(`${path}.specificTargets`, [{
                                               id: uid(),
                                               type: selected,
                                               items: [],
                                               legends: generateLegendDefaults(legendDefinitions, weight, highIsGood)
                                           }]);
                                       }}>
                        <SingleSelectOption value="period" label={i18n.t("Period")}/>
                        <SingleSelectOption value="orgUnit" label={i18n.t("Organisation Unit")}/>
                        <SingleSelectOption value="orgUnitLevel" label={i18n.t("Organisation Unit Level")}/>
                    </SingleSelectField>
                    <div className="column gap-8">
                        <Suspense fallback={<div>Loading...</div>}>
                            {
                                selectedType !== "orgUnitLevel" && specificTargets?.map(target => (
                                    selectedType === "period" ?
                                        <PeriodSpecificTargetView
                                            defaultLegends={defaultLegends}
                                            onDelete={() => {
                                                setValue(`${path}.specificTargets`, []);

                                            }} legendDefinitions={legendDefinitions}
                                            onUpdate={() => setOpenConfigDialog(true)} key={`${target.id}-view`}
                                            specificTarget={target}
                                        /> :
                                        <OrgUnitSpecificTargetView
                                            defaultLegends={defaultLegends}
                                            onDelete={() => {
                                                setValue(`${path}.specificTargets`, []);

                                            }} legendDefinitions={legendDefinitions}
                                            onUpdate={() => setOpenConfigDialog(true)} key={`${target.id}-view`}
                                            specificTarget={target}
                                        />
                                ))
                            }
                        </Suspense>
                    </div>
                    {
                        selectedType === "period" && openConfigDialog && !isEmpty(specificTargets) ?
                            <PeriodSpecificTargetsModal
                                defaultLegends={defaultLegends}
                                onChangeDefaultLegends={(legends) => setValue(`${path}.legends`, legends)}
                                specificTarget={specificTargets[0]}
                                onClose={() => setOpenConfigDialog(false)}
                                open={openConfigDialog}
                                onUpdate={(target) => {
                                    setOpenConfigDialog(false);
                                    setValue(`${path}.specificTargets`, [target]);
                                }}
                            /> : null
                    }
                    {
                        selectedType === "orgUnit" && openConfigDialog && !isEmpty(specificTargets) ?
                            <OrgUnitSpecificTargetsModal
                                defaultLegends={defaultLegends}
                                onChangeDefaultLegends={(legends) => setValue(`${path}.legends`, legends)}
                                specificTarget={specificTargets[0]}
                                onClose={() => setOpenConfigDialog(false)}
                                open={openConfigDialog}
                                onUpdate={(target) => {
                                    setOpenConfigDialog(false);
                                    setValue(`${path}.specificTargets`, [target]);
                                }}
                            /> : null
                    }
                    {
                        selectedType === "orgUnitLevel" && <OrgUnitLevelSpecificTargets path={path}/>
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

TargetsArea.propTypes = {
    path: PropTypes.string.isRequired,
};

