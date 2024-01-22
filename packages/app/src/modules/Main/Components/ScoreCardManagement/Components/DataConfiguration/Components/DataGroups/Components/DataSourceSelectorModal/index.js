import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle,} from "@dhis2/ui";
import {DataSourceSelector} from "@hisptz/dhis2-ui";
import PropTypes from "prop-types";
import React, {useState} from "react";

//TODO: Refactor to shared

export default function DataSourceSelectorModal({
                                                    onClose,
                                                    open,
                                                    onSelect,
                                                    disabled,
                                                }) {
    const [selectedItems, setSelectedItems] = useState([]);


    return (
        <Modal onClose={onClose} position={"middle"} large hide={!open}>
            <ModalTitle>{i18n.t("Add Data source")}</ModalTitle>
            <ModalContent>
                <div className="w-100">
                    <DataSourceSelector
                        dataSources={[
                            "indicator",
                            "dataElement",
                            "dataSet",
                            "programIndicator",
                            "customFunction",
                        ]}
                        selected={selectedItems}
                        disabled={disabled}
                        onSelect={setSelectedItems}
                    />
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
                    <Button
                        dataTest={"scorecard-data-source-add"}
                        primary
                        onClick={() => {
                            onSelect(selectedItems);
                            onClose();
                        }}
                    >
                        {i18n.t("Add")}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    );
}

DataSourceSelectorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    disabled: PropTypes.array,
    open: PropTypes.bool,
};
