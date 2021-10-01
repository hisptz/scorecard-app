import { colors, Field } from "@dhis2/ui";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import produce from "immer";
import { fromPairs, head, set } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { OrgUnitLevels } from "../../../../../../core/state/orgUnit";
import { generateLegendDefaults } from "../../../../../utils/utils";
import { FormFieldModel } from "../../../models";
import { CustomInput } from "../../CustomField";

export default function LevelTargetsField({
  name,
  value: initialValue = [],
  onChange,
  multipleFields,
  weight,
  highIsGood,
  ...props
}) {
  const orgUnitLevels = useRecoilValue(OrgUnitLevels);
  const [expanded, setExpanded] = useState(head(orgUnitLevels)?.id);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const value = useMemo(
    () =>
      !Array.isArray(initialValue)
        ? initialValue
        : fromPairs([
            ...orgUnitLevels?.map(({ id }) => [
              id,
              generateLegendDefaults(multipleFields, weight, highIsGood),
            ]),
          ]),
    [highIsGood, initialValue, multipleFields, orgUnitLevels, weight]
  );
  const onFieldChange = (index, newValue, level) => {
    onChange({
      value: produce(value, (draft) => {
        return set(draft, [level, index], newValue);
      }),
    });
  };

  useEffect(() => {
    if (Array.isArray(initialValue)) {
      onChange({
        value,
      });
    }
  }, [value, initialValue]);

  return (
    <Field name={name} {...props}>
      {orgUnitLevels?.map(({ id, displayName }) => (
        <Accordion
          expanded={expanded === id}
          key={id}
          onChange={handleChange(id)}
        >
          <AccordionSummary style={{ background: colors.grey200 }}>
            {displayName}
          </AccordionSummary>
          <AccordionDetails>
            <div className="column w-100">
              {multipleFields?.map((field, index) => {
                const input = {
                  name: field?.name,
                  onChange: (value) => onFieldChange(index, value, id),
                  value: value?.[id]?.[index],
                };
                return (
                  <CustomInput
                    key={`level-${id}-${index}`}
                    valueType={field.valueType}
                    input={input}
                    {...field}
                  />
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Field>
  );
}

LevelTargetsField.propTypes = {
  highIsGood: PropTypes.bool.isRequired,
  multipleFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel))
    .isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};
