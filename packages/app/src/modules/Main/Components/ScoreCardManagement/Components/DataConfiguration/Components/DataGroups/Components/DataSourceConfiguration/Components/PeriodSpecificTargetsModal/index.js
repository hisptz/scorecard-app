import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, InputField, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {PeriodSelectorModal} from "@hisptz/dhis2-ui";
import {Period} from "@iapps/period-utilities";
import {SystemSettingsState} from "@scorecard/shared";
import {compact, isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useCallback, useState} from 'react'
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";

export default function PeriodSpecificTargetsModal({
                                                       open,
                                                       onClose,
                                                       onUpdate,
                                                       specificTarget,
                                                       defaultLegends,
                                                       onChangeDefaultLegends,
                                                       path
                                                   }) {
    const {watch} = useFormContext();

    const [target, setTarget] = useState(specificTarget);
    const {calendar} = useRecoilValue(SystemSettingsState);

    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const highIsGood = watch(`${path}.highIsGood`);
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
                        <div className="column flex-1">
                            <InputField fullWidth label={i18n.t("Period")} disabled value={target?.items?.map(item => {
                                if (item) {
                                    return new Period().setPreferences({allowFuturePeriods: true}).setCalendar(calendar).getById(item)?.name
                                }
                            })?.join(", ")}/>
                        </div>
                        <div className="w-25">
                            <Button onClick={() => setPeriodSelectorOpen(true)}>{i18n.t("Change Period")}</Button>
                        </div>
                    </div>
                    {
                        periodSelectorOpen &&
                        <PeriodSelectorModal
                            enablePeriodSelector
                            excludeRelativePeriods
                            singleSelection
                            selectedPeriods={compact([...(target.items?.map(item => {
                                if (item) {
                                    return item;
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
                                highIsGood={highIsGood}
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
                    <div className="row">
                        <div className="column w-100 legend-settings-area">
                            <p>{i18n.t("Other Periods")}</p>
                            <LegendsField
                                highIsGood={highIsGood}
                                legendDefinitions={legendDefinitions}
                                value={defaultLegends}
                                onChange={onChangeDefaultLegends}
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
    path: PropTypes.string.isRequired,
    specificTarget: PropTypes.object.isRequired,
    defaultLegends: PropTypes.any,
    open: PropTypes.bool,
    onChangeDefaultLegends: PropTypes.func,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
};
