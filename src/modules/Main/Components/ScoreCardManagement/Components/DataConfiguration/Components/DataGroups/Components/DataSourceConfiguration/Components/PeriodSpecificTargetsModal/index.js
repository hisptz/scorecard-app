import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, InputField, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {PeriodSelectorModal} from "@hisptz/react-ui";
import {Period} from "@iapps/period-utilities";
import {compact, isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useCallback, useState} from 'react'
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";

export default function PeriodSpecificTargetsModal({open, onClose, onUpdate, specificTarget}) {
    const {watch} = useFormContext();
    const [target, setTarget] = useState(specificTarget);
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const [periodSelectorOpen, setPeriodSelectorOpen] = useState(isEmpty(target.items))


    const onUpdateClick = useCallback(
        () => {
            onUpdate({
                ...target,
            });
            onClose();
        },
        [onClose, onUpdate, target],
    );

    return (
        <Modal onClose={onClose} hide={!open} position="middle">
            <ModalTitle>{i18n.t("Period Specific Targets")}</ModalTitle>
            <ModalContent>
                <div className="column w-100 gap-16">
                    <div className=" align-items-end row gap-8 w-100">
                        <div className="column">
                            <InputField fullWidth label={i18n.t("Period")} disabled value={target?.items?.map(item => {
                                if (item) {
                                    return new Period().getById(item)?.name
                                }
                            })?.join(", ")}/>
                        </div>
                        <div>
                            <Button onClick={() => setPeriodSelectorOpen(true)}>{i18n.t("Change Period")}</Button>
                        </div>
                    </div>
                    {
                        periodSelectorOpen &&
                        <PeriodSelectorModal
                            excludeRelativePeriods
                            singleSelection
                            selectedPeriods={compact([...(target.items?.map(item => {
                                if (item) {
                                    return new Period().getById(item)
                                }
                            }) ?? [])])}
                            onClose={() => setPeriodSelectorOpen(false)} hide={!periodSelectorOpen}
                            onUpdate={(periods) => {
                                setTarget(prevState => {
                                    return {
                                        ...prevState,
                                        items: [periods[0]?.id]
                                    }
                                });
                                setPeriodSelectorOpen(false)
                            }}
                        />
                    }
                    <div className="row">
                        <div className="column w-100 legend-settings-area">
                            <LegendsField
                                legendDefinitions={legendDefinitions}
                                value={target.legends}
                                onChange={(legends) => {
                                    setTarget(prevState => {
                                        return {
                                            ...prevState,
                                            legends
                                        }
                                    });
                                }}
                            />
                        </div>
                    </div>
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
    specificTarget: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
};