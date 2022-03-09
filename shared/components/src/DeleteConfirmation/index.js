import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
export default function DeleteConfirmation({
  onConfirm,
  onCancel,
  text,
  component,
}) {
  return (
    <Modal dataTest="delete-confirm-modal" onClose={onCancel}>
      <ModalTitle>Delete Confirmation</ModalTitle>
      <ModalContent>
        {component
          ? component
          : text
          ? text
          : i18n.t("Are you sure you want to delete this entity?")}
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onCancel}>{i18n.t("Cancel")}</Button>
          <Button dataTest={"delete-confirm-button"} destructive onClick={onConfirm}>
            {i18n.t("Delete")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  component: PropTypes.node,
  text: PropTypes.string,
};
