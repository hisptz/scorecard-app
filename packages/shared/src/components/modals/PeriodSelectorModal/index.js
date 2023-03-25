import {PeriodDimension} from "@dhis2/analytics";
import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle,} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import EthiopianPeriodDimension from "./Components/EthiopianPeriodDimension";
import {SystemSettingsState} from "../../../state";
import {CalendarTypes} from "../../../constants";

export default function PeriodSelectorModal({
                                                initialValue,
                                                onSelect,
                                                onClose,
                                            }) {
    const [value, setValue] = useState(initialValue ?? {periods: []});
    const {calendar} = useRecoilValue(SystemSettingsState) ?? {};
    const onPeriodSelect = (value) => {
        setValue((prevValue) => ({
            ...prevValue,
            periods: value?.items,
        }));
    };
    const onUpdateClick = () => {
        onSelect(value);
        onClose();
    };

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Select Period(s)</ModalTitle>
            <ModalContent>
                <div className="row center align-items-center">
                    {calendar === CalendarTypes.ETHIOPIAN ? (
                        <EthiopianPeriodDimension
                            onSelect={onPeriodSelect}
                            selectedPeriods={value?.periods ?? []}
                        />
                    ) : (
                        <PeriodDimension
                            onSelect={onPeriodSelect}
                            selectedPeriods={value?.periods ?? []}
                        />
                    )}
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={onUpdateClick}>
                        Update
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    );
}

PeriodSelectorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    initialValue: PropTypes.object,
};
