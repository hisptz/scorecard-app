import i18n from "@dhis2/d2-i18n";
import {InputField, SingleSelectField, SingleSelectOption, Tab, TabBar, Transfer,} from "@dhis2/ui";
import {Period} from "@iapps/period-utilities";
import {filter, head} from "lodash";
import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import {CalendarTypes, PeriodCategories} from "../../../../constants";

export default function CalendarSpecificPeriodDimension({
                                                            calendar,
                                                            onSelect,
                                                            selectedPeriods,
                                                        }) {
    const periodInstance = new Period().setPreferences({allowFuturePeriods: true}).setCalendar(calendar);
    const [selectedPeriodCategory, setSelectedPeriodCategory] = useState(
        head(Object.values(PeriodCategories))
    );
    const {_periodType} = periodInstance.get() ?? {};
    const {_periodTypes} = _periodType ?? {};
    const relativePeriodTypes = filter(_periodTypes, ({id}) =>
        id.toLowerCase().match(RegExp("relative".toLowerCase()))
    );
    const fixedPeriodTypes = filter(
        _periodTypes,
        ({id}) => !id.toLowerCase().match(RegExp("relative".toLowerCase()))
    );

    const [selectedRelativePeriodType, setSelectedRelativePeriodType] = useState(
        head(relativePeriodTypes)?.id
    );
    const [selectedFixedPeriodType, setSelectedFixedPeriodType] = useState(
        head(fixedPeriodTypes)?.id
    );

    const [year, setYear] = useState(2013); //TODO: Fix getting the current year from the period utilities

    const periods = useMemo(() => {
        if (selectedPeriodCategory.key === PeriodCategories.RELATIVE.key) {
            return new Period().setPreferences({allowFuturePeriods: true})
                .setCalendar(calendar)
                .setYear(year)
                .setType(selectedRelativePeriodType)
                .get()
                .list();
        }
        return new Period().setPreferences({allowFuturePeriods: true})
            .setCalendar(calendar)
            .setYear(year)
            .setType(selectedFixedPeriodType)
            .get()
            .list();
    }, [
        selectedPeriodCategory,
        selectedRelativePeriodType,
        selectedFixedPeriodType,
        year,
    ]);

    return (
        <div className="column center align-items-center w-100">
            <Transfer
                selected={selectedPeriods}
                selectedWidth={"400px"}
                optionsWidth={"400px"}
                height={"500px"}
                leftHeader={
                    <div className="column pb-8">
                        <TabBar>
                            {Object.values(PeriodCategories)?.map((periodCategory) => (
                                <Tab
                                    onClick={() => {
                                        setSelectedPeriodCategory(periodCategory);
                                    }}
                                    selected={selectedPeriodCategory.key === periodCategory.key}
                                    key={`${periodCategory.key}-tab`}
                                >
                                    {periodCategory.name}
                                </Tab>
                            ))}
                        </TabBar>
                        {selectedPeriodCategory?.key === "relative" ? (
                            <div className="pt-8">
                                <SingleSelectField
                                    dense
                                    selected={selectedRelativePeriodType}
                                    onChange={({selected}) =>
                                        setSelectedRelativePeriodType(selected)
                                    }
                                    label={i18n.t("Period Type")}
                                >
                                    {relativePeriodTypes?.map((periodType) => (
                                        <SingleSelectOption
                                            key={periodType?.id}
                                            label={periodType?.name}
                                            value={periodType?.id}
                                        />
                                    ))}
                                </SingleSelectField>
                            </div>
                        ) : (
                            <div className="row space-between align-items-center w-100 pt-8">
                                <div className="w-60">
                                    <SingleSelectField
                                        dense
                                        selected={selectedFixedPeriodType}
                                        onChange={({selected}) =>
                                            setSelectedFixedPeriodType(selected)
                                        }
                                        label={i18n.t("Period Type")}
                                    >
                                        {fixedPeriodTypes?.map((periodType) => (
                                            <SingleSelectOption
                                                key={periodType?.id}
                                                label={periodType?.name}
                                                value={periodType?.id}
                                            />
                                        ))}
                                    </SingleSelectField>
                                </div>
                                <div className="w-40">
                                    <InputField
                                        name={"year"}
                                        dense
                                        label={i18n.t("Year")}
                                        type={"number"}
                                        value={year}
                                        onChange={({value}) => setYear(value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                }
                options={[...periods, ...selectedPeriods]?.map((period) => ({
                    label: period.name,
                    value: period,
                }))}
                onChange={({selected}) => {
                    onSelect({
                        items: selected,
                    });
                }}
            />
        </div>
    );
}

CalendarSpecificPeriodDimension.propTypes = {
    calendar: PropTypes.oneOf(Object.values(CalendarTypes)).isRequired,
    selectedPeriods: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};
