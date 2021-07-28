import {PeriodDimension} from "@dhis2/analytics";
import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState} from "react";


export default function PeriodSelectorModal({initialValue, onSelect, onClose}) {
    const [value, setValue] = useState(initialValue ?? {periods: []});

    const onPeriodSelect = (value) => {
        setValue(prevValue => ({
            ...prevValue,
            periods: value?.items
        }))
    }
    const onUpdateClick = () => {
        onSelect(value)
        onClose()
    }

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Select Period(s)</ModalTitle>
            <ModalContent>
                <PeriodDimension onSelect={onPeriodSelect} selectedPeriods={value?.periods ?? []}/>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={onUpdateClick}>Update</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

PeriodSelectorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    initialValue: PropTypes.object,
};
