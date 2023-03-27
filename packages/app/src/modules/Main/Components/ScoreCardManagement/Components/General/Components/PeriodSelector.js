import i18n from '@dhis2/d2-i18n';
import {CustomSelectField} from "@hisptz/dhis2-ui";
import {PeriodTypeCategory, PeriodUtility} from "@hisptz/dhis2-utils";
import {find, head} from "lodash";
import React, {useMemo, useState} from "react";
import {Controller, useFormContext, useWatch} from "react-hook-form";

export default function PeriodSelector() {
    const {getValues} = useFormContext();

    const defaultYear = useMemo(() => {
        const period = head(getValues('periodSelection.periods'));
        const periodObject = PeriodUtility.getPeriodById(period?.id);
        return periodObject.start.year;
    }, [getValues]);
    const [year, setYear] = useState(defaultYear ?? new Date().getFullYear());
    const periodType = useWatch({
        name: "periodType"
    });

    const options = useMemo(() => {
        if (!periodType) {
            return [];
        }

        const utility = PeriodUtility.fromObject({
            year,
            category: PeriodTypeCategory.FIXED,
        });
        const type = utility.getPeriodType(periodType.toUpperCase());
        return type?.periods?.map(({id, name}) => ({
            name: name,
            code: id
        }))
    }, [periodType, year]);

    const years = useMemo(() => new Array(10).fill("").map((_, index) => ({
            code: (new Date().getFullYear() - index).toString(),
            name: new Date().getFullYear() - index
        })).reverse(),
        []
    );


    return (<Controller
        render={({field}) => {

            const onChange = (code) => {
                const period = PeriodUtility.getPeriodById(code);

                field.onChange({
                    periods: [{
                        name: period.name,
                        id: period?.id
                    }]
                })
            }

            const valueId = head(field?.value?.periods)?.id;

            const value = find(options, ['code', valueId]) ? valueId : undefined;


            return (<div style={{display: "flex", gap: 16, width: "100%"}}>
                <CustomSelectField
                    fullWidth
                    label={i18n.t("Year")}
                    value={year.toString()}
                    optionSet={{options: years}}
                    name="year"
                    onChange={setYear}
                />
                <CustomSelectField
                    fullWidth
                    label={i18n.t("Period")}
                    value={value}
                    optionSet={{options}}
                    name="periodSelection"
                    onChange={onChange}
                />
            </div>)
        }}
        name="periodSelection"
    />)
}
