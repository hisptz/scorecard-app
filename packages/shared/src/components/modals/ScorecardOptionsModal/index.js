import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle,} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import ScorecardOptionsForm from "../../ScorecardOptionsForm";
import i18n from '@dhis2/d2-i18n'
import {ScorecardOptions} from "../../../models";

export default function ScorecardOptionsModal({
                                                  onSelect,
                                                  onClose,
                                                  initialValues,
                                              }) {
    const [values, setValues] = useState(initialValues);

    const onChange = (key) => (newValue) => {
        setValues((prevState) => {
            return ScorecardOptions.set(
                prevState,
                key,
                newValue?.checked ?? newValue
            );
        });
    };

    const onUpdateClick = () => {
        onSelect(values);
        onClose();
    };

    return (
        <Modal onClose={onClose} large>
            <ModalTitle>{i18n.t("Options")}</ModalTitle>
            <ModalContent>
                <div className="column">
                    <ScorecardOptionsForm options={values} onChange={onChange}/>
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
                    <Button
                        dataTest={"update-button-on-options"}
                        primary
                        onClick={onUpdateClick}
                    >
                        {i18n.t("Update")}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    );
}

ScorecardOptionsModal.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};
