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
import ScorecardOptions from "../../../core/models/scorecardOptions";
import ScorecardOptionsForm from "../ScorecardOptionsForm";

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
      <ModalTitle>Options</ModalTitle>
      <ModalContent>
        <div className="column">
          <ScorecardOptionsForm options={values} onChange={onChange} />
        </div>
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            dataTest={"update-button-on-options"}
            primary
            onClick={onUpdateClick}
          >
            Update
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
