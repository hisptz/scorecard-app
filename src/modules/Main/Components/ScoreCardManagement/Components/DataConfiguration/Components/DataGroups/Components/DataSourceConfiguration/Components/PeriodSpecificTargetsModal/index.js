import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Field, InputField, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {PeriodSelectorModal} from "@hisptz/react-ui";
import {compact} from "lodash";
import PropTypes from 'prop-types'
import React, {useCallback, useState} from 'react'
import {useFormContext} from "react-hook-form";
import TargetsField
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm/Components/TargetsField";
import {DHIS2ValueTypes} from "../../../../../../../../../../../../shared/Components/CustomForm/constants";
import {FormFieldModel} from "../../../../../../../../../../../../shared/Components/CustomForm/models";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";

export default function PeriodSpecificTargetsModal({open, onClose, onUpdate, path}) {
    const {watch, setValue} = useFormContext();
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const [periodSelectorOpen, setPeriodSelectorOpen] = useState(true)
    const [period, setPeriod] = useState();


    const onUpdateClick = useCallback(
        () => {
            setValue(`${path}.items`, [period]);
            setValue(`${path}.type`, "period");
            onUpdate();
            onClose();
        },
        [onClose, onUpdate, path, period, setValue],
    );


    return (
        <Modal onClose={onClose} hide={!open} position="middle">
            <ModalTitle>{i18n.t("Period Specific Targets")}</ModalTitle>
            <ModalContent>
                <div className="column w-100 gap-16">
                    <div className=" align-items-end row gap-8 w-100">
                        <div className="column">
                            <InputField fullWidth label={i18n.t("Period")} disabled value={period?.name}/>
                        </div>
                        <div>
                            <Button onClick={() => setPeriodSelectorOpen(true)}>{i18n.t("Change Period")}</Button>
                        </div>
                    </div>
                    {
                        periodSelectorOpen &&
                        <PeriodSelectorModal
                            singleSelection
                            selectedPeriods={compact([period])}
                            onClose={() => setPeriodSelectorOpen(false)} hide={!periodSelectorOpen}
                            onUpdate={(periods) => {
                                setPeriod(periods[0])
                                setPeriodSelectorOpen(false)
                            }}
                        />
                    }
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
                    <Field label={i18n.t("Other Periods")}>
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

                    </Field>
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
                    <Button onClick={onUpdateClick} primary>{i18n.t("Update")}</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}


PeriodSpecificTargetsModal.propTypes = {
    open: PropTypes.bool,
    path: PropTypes.string,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
};
