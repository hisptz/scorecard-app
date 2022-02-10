import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, InputField, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {OrgUnitSelectorModal} from "@hisptz/react-ui";
import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {useCallback, useState} from 'react'
import {useFormContext} from "react-hook-form";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";

export default function OrgUnitSpecificTargetsModal({
                                                        open,
                                                        onClose,
                                                        onUpdate,
                                                        specificTarget,
                                                        defaultLegends,
                                                        onChangeDefaultLegends
                                                    }) {
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
            <ModalTitle>{i18n.t("Organisation Unit Specific Targets")}</ModalTitle>
            <ModalContent>
                <div className="column w-100 gap-16">
                    <div className=" align-items-end row gap-8 w-100">
                        <div className="column flex-1">
                            <InputField fullWidth label={i18n.t("Organisation Unit(s)")} disabled
                                        value={target?.items?.join(", ")}/>
                        </div>
                        <div className="w-25">
                            <Button onClick={() => setPeriodSelectorOpen(true)}>{i18n.t("Change")}</Button>
                        </div>
                    </div>
                    {
                        periodSelectorOpen &&
                        <OrgUnitSelectorModal
                            value={{
                                orgUnits: target?.items?.map(item => ({id: item})) ?? [],
                            }}
                            onClose={() => setPeriodSelectorOpen(false)} hide={!periodSelectorOpen}
                            onUpdate={({orgUnits}) => {
                                setTarget(prevState => {
                                    return {
                                        ...prevState,
                                        items: orgUnits?.map(orgUnit => orgUnit.id)
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
                    <div className="row">
                        <div className="column w-100 legend-settings-area">
                            <p>{i18n.t("Other Periods")}</p>
                            <LegendsField
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


OrgUnitSpecificTargetsModal.propTypes = {
    defaultLegends: PropTypes.array.isRequired,
    specificTarget: PropTypes.object.isRequired,
    onChangeDefaultLegends: PropTypes.func.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
};
