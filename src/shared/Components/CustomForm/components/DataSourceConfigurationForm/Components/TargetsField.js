import {RHFCustomInput} from "@hisptz/react-ui";
import PropTypes from "prop-types";
import React from "react";
import useTargetsManage
    from "../../../../../../modules/Main/Components/ScoreCardManagement/Components/DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/hooks/useTargetsManage";
import {DHIS2ValueTypes} from "../../../constants";
import {FormFieldModel} from "../../../models";

export default function TargetsField(props) {
    const {
        name,
    } = props ?? {};
    useTargetsManage(props);

    return (
        <RHFCustomInput
            valueType={DHIS2ValueTypes.MULTIPLE_FIELDS.name}
            name={name}
            {...props}
        />
    );
}

TargetsField.propTypes = {
    multipleFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel))
        .isRequired,
    name: PropTypes.string.isRequired,
};
