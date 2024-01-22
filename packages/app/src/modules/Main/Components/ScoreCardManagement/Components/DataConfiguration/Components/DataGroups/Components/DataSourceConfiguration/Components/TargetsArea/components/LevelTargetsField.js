import {colors, Field} from "@dhis2/ui";
import {FormFieldModel} from "@scorecard/shared";
import {OrgUnitLevels} from "@scorecard/shared";
import {generateLegendDefaults} from "@scorecard/shared";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import produce from "immer";
import {fromPairs, get, head, set} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import {getNonDefaultLegendDefinitions} from "../../../../../../../../General/utils/utils";
import LegendsField from "./LegendsField";

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
    const {watch} = useFormContext();
    const [expanded, setExpanded] = useState(head(orgUnitLevels)?.id);
    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const value = useMemo(
        () =>
            !Array.isArray(initialValue)
                ? initialValue
                : fromPairs([
                    ...(orgUnitLevels?.map(({id}) => [
                        id,
                        generateLegendDefaults(multipleFields, weight, highIsGood),
                    ])) ?? [],
                ]),
        [highIsGood, initialValue, multipleFields, orgUnitLevels, weight]
    );
    const onFieldChange = (newValue, level) => {
        onChange({
            value: produce(value, (draft) => {
                return set(draft, [level], newValue);
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
            {orgUnitLevels?.map(({id, displayName}) => (
                <Accordion
                    expanded={expanded === id}
                    key={id}
                    onChange={handleChange(id)}
                >
                    <AccordionSummary style={{background: colors.grey200}}>
                        {displayName}
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="column w-100">
                            <LegendsField
                                highIsGood={highIsGood}
                                legendDefinitions={legendDefinitions}
                                value={get(value, id) ?? []}
                                onChange={(value) => onFieldChange(value, id)}
                            />
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
