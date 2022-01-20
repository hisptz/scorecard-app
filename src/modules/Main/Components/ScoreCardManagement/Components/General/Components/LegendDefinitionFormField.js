import i18n from '@dhis2/d2-i18n'
import PropTypes from "prop-types";
import React, {useCallback} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardConfigDirtySelector, ScorecardConfigDirtyState} from "../../../../../../../core/state/scorecard";
import {FieldErrorState} from "../../../../../../../core/state/validators";
import {CustomInput} from "../../../../../../../shared/Components/CustomForm/components/CustomField";
import {FormFieldModel} from "../../../../../../../shared/Components/CustomForm/models";
import {resetLegends} from "../utils/utils";

export default function LegendDefinitionFormField({field, dataTest}) {
    const [value, setValue] = useRecoilState(ScorecardConfigDirtyState(field.id));
    const [, setGroups] = useRecoilState(ScorecardConfigDirtySelector({key: "dataSelection", path: ["dataGroups"]}));
    const error = useRecoilValue(
        FieldErrorState({
            id: field.id,
            validations: {mandatory: field?.mandatory},
        })
    );
    const onChange = useCallback(
        (newValue) => {
            if (value.length !== newValue.length) {
                if (window.confirm(i18n.t("Changing the number of legend definitions will reset the legend values in all configured indicators. Are you sure you want to continue?"))) {
                    resetLegends(setGroups, newValue);
                }
            }
            setValue(newValue);
        },
        [setValue, setGroups, value]
    );
    const input = {
        value,
        onChange,
        label: field?.formName,
        required: field?.mandatory,
        error: !!error,
        validationText: error ?? "",
    }

    return (
        <CustomInput
            dataTest={dataTest}
            valueType={field.valueType}
            input={input}
            {...field}
        />
    );


}

LegendDefinitionFormField.propTypes = {
    field: PropTypes.instanceOf(FormFieldModel).isRequired,
    dataTest: PropTypes.string,
};
