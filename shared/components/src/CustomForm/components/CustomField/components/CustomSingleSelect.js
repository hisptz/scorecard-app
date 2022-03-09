import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function CustomSingleSelect({
  options,
  onChange,
  value,
  name,
  ...props
}) {
  return (
    <SingleSelectField
      selected={value}
      onChange={({ selected }) => onChange({ name, value: selected })}
      {...props}
    >
      {options?.map(({ label, value }) => (
        <SingleSelectOption label={label} value={value} key={value} />
      ))}
    </SingleSelectField>
  );
}

CustomSingleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};
