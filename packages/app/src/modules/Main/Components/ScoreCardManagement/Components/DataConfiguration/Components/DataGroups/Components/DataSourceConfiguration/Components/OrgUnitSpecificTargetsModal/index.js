import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, CircularLoader, InputField, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {OrgUnitSelectorModal} from "@hisptz/dhis2-ui";
import {SelectedOrgUnits} from "@scorecard/shared";
import {isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {Suspense, useCallback, useState} from 'react'
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import {getNonDefaultLegendDefinitions} from "../../../../../../../General/utils/utils";
import LegendsField from "../TargetsArea/components/LegendsField";

function OrgUnitSelector({target, setTarget}) {
    const [periodSelectorOpen, setPeriodSelectorOpen] = useState(isEmpty(target.items))

    const orgUnits = useRecoilValue(SelectedOrgUnits(target.items))


    return (
        <>
            <div className=" align-items-end row gap-8 w-100">
                <div className="column flex-1">
                    <InputField fullWidth label={i18n.t("Organisation Unit(s)")} disabled
                                value={orgUnits?.map(ou => ou?.displayName)?.join(", ")}/>
                </div>
                <div className="w-25">
                    <Button onClick={() => setPeriodSelectorOpen(true)}>{i18n.t("Change")}</Button>
                </div>
            </div>
            {
                periodSelectorOpen &&
                <OrgUnitSelectorModal
                    value={{
                        orgUnits: orgUnits ?? [],
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

        </>
    )
}

OrgUnitSelector.propTypes = {
    setTarget: PropTypes.func,
    target: PropTypes.object,
};

export default function OrgUnitSpecificTargetsModal({
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
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));
    const highIsGood = watch(`${path}.highIsGood`);

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
                <Suspense fallback={<div className="column align-items-center justify-content-center"
                                         style={{height: 100, width: "100%",}}><CircularLoader small/></div>}>
                    <div className="column w-100 gap-16">
                        <OrgUnitSelector target={target} setTarget={setTarget}/>
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
                </Suspense>
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
    path: PropTypes.string.isRequired,
    specificTarget: PropTypes.object.isRequired,
    onChangeDefaultLegends: PropTypes.func.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
};
