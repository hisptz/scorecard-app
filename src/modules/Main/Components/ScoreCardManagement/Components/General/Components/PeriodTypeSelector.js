import i18n from '@dhis2/d2-i18n'
import {SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import {PeriodType} from "@iapps/period-utilities";
import {filter} from "lodash";
import PropTypes from 'prop-types'
import React, {useMemo} from "react";
import {Controller} from "react-hook-form";
import classes from "../styles/PeriodTypeSelector.module.css";

export default function PeriodTypeSelector({label, name}) {
    const periodTypes = useMemo(() => new PeriodType().get(), []);
    const fixedPeriodTypes = useMemo(() => filter(periodTypes, (periodType) => !periodType.name.match(RegExp("relative", "i"))), [periodTypes]);
    const relativePeriodTypes = useMemo(() => filter(periodTypes, (periodType) => periodType.name.match(RegExp("relative", "i"))), [periodTypes]);

    return (
        <Controller
            name={name}
            rules={{
                required: i18n.t("Period type is required")
            }}
            render={({field, fieldState}) => {

                return (
                    <SingleSelectField
                        {...field}
                        label={label}
                        required
                        filterable
                        selected={field.value}
                        onChange={({selected}) => field.onChange(selected)}
                        validationText={fieldState.error?.message}
                        error={!!fieldState.error}>
                        <SingleSelectOption value={"disabled"} disabled className={classes['select-header']}
                                            label={i18n.t("Fixed Periods")}/>
                        {
                            fixedPeriodTypes?.map((periodType) => {
                                return (
                                    <SingleSelectOption
                                        key={periodType.id}
                                        value={periodType.id}
                                        label={periodType.name}
                                    />
                                )
                            })
                        }
                        <SingleSelectOption value="disabled" disabled className={classes['select-header']}
                                            label={i18n.t("Relative Periods")}/>
                        {
                            relativePeriodTypes?.map((periodType) => {
                                return (
                                    <SingleSelectOption
                                        key={periodType.id}
                                        value={periodType.id}
                                        label={periodType.name}
                                    />
                                )
                            })
                        }
                    </SingleSelectField>
                )
            }}
        />
    )
}

PeriodTypeSelector.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
}
