import {
  Button,
  ButtonStrip,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import LayoutSelector from "./LayoutSelector";

export default function LayoutSelectorModal({
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
      <ModalTitle>Select Layout(s)</ModalTitle>
      <ModalContent>
        <LayoutSelector onLayoutChange={setValue} layout={value} />
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

LayoutSelectorModal.propTypes = {
  initialValue: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
