import { CheckboxField } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function CustomCheckboxField({
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <CheckboxField
      {...props}
      checked={Boolean(value)}
      onChange={({ checked }) => onChange({ value: checked, name })}
    />
  );
}

CustomCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};
