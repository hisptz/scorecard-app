import PropTypes from "prop-types";
import React from "react";
import { useRecoilState } from "recoil";
import { ScorecardStateSelector } from "../../../../../../../core/state/scorecard";
import { CustomInput } from "../../../../../../../shared/Components/CustomForm/components/CustomField";
import { FormFieldModel } from "../../../../../../../shared/Components/CustomForm/models";

export default function GeneralFormField({ field, dataTest }) {
  const [value, setValue] = useRecoilState(ScorecardStateSelector(field.id));

  const onChange = (newValue) => {
    setValue(newValue);
  };
  const input = {
    value,
    onChange,
    label: field?.formName,
  };
  return (
    <CustomInput
      dataTest={dataTest}
      valueType={field.valueType}
      input={input}
      {...field}
    />
  );
}

GeneralFormField.propTypes = {
  field: PropTypes.instanceOf(FormFieldModel).isRequired,
};
