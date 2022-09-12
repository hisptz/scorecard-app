import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Input } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function EditTitle({
  titleEditValue,
  setTitleEditValue,
  title,
  onClose,
  onTitleEditSubmit,
}) {
  return (
    <div className="row space-between w-100">
      <div onClick={(event) => event.stopPropagation()} className="column">
        <Input
          initialFocus
          value={titleEditValue}
          onChange={({ value }) => setTitleEditValue(value)}
        />
      </div>
      <div className="column ">
        <ButtonStrip end>
          <Button onClick={onTitleEditSubmit}>{i18n.t("Save")}</Button>
          <Button
            onClick={(_, event) => {
              event.stopPropagation();
              onClose(false);
              setTitleEditValue(title);
            }}
          >
            {i18n.t("Cancel")}
          </Button>
        </ButtonStrip>
      </div>
    </div>
  );
}

EditTitle.propTypes = {
  title: PropTypes.string.isRequired,
  titleEditValue: PropTypes.string.isRequired,
  setTitleEditValue: PropTypes.func.isRequired,
  onTitleEditSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
