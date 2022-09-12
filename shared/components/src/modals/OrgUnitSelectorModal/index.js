import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle,} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import OrgUnitFilter from "../../OrgUnitFilter";

export default function OrgUnitSelectorModal({
                                                 onClose,
                                                 onSelect,
                                                 initialValue,
                                             }) {
    const [value, setValue] = useState(initialValue);

    const onUpdateClick = () => {
        onSelect(value);
        onClose();
    };

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Select Organisation Unit(s)</ModalTitle>
            <ModalContent>
                <OrgUnitFilter value={value} onUpdate={setValue}/>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        primary
                        onClick={onUpdateClick}
                        dataTest={"update-on-select-org-unit"}
                    >
                        Update
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    );
}

OrgUnitSelectorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    initialValue: PropTypes.object,
};
