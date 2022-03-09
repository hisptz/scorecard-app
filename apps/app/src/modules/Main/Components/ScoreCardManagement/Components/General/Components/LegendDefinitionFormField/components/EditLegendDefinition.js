import i18n from "@dhis2/d2-i18n";
import {Button, IconDelete24} from "@dhis2/ui";
import {CustomInput} from "@hisptz/react-ui";
import {DHIS2ValueTypes} from "@hisptz/scorecard-constants";
import PropTypes from "prop-types";
import React, {useCallback} from "react";

export function EditLegendDefinition({legendDefinition, onEdit, onDelete}) {


    const onDeleteClick = useCallback(() => {
        if (onDelete) {
            onDelete(legendDefinition);
        }
    }, [legendDefinition, onDelete]);

    const onEditClick = useCallback((data) => {
        onEdit(data);
    }, [onEdit]);

    return (
        <div className="row gap-16 align-items-center">
            <CustomInput
                input={{
                    value: legendDefinition,
                    onChange: onEditClick
                }}
                validations={{
                    validate: (value) => {
                        if (!value?.color) {
                            return i18n.t("Color is required")
                        }
                        if (!value?.name) {
                            return i18n.t("Label is required")
                        }
                        return true;
                    }
                }}
                name="newLegendDefinition"
                valueType={DHIS2ValueTypes.LEGEND_DEFINITION.name}/>
            {
                onDelete &&
                <Button icon={<IconDelete24/>} onClick={onDeleteClick}>{i18n.t("Delete")}</Button>
            }
        </div>
    )
}

EditLegendDefinition.propTypes = {
    legendDefinition: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func,

};
