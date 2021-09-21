import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from 'prop-types'
import React from "react";
import {NO_GROUPS_HELP_STEPS} from "../../../../../../../core/constants/help/scorecardManagement";
import Help from "../../Help";

export default function EmptyDataGroups({onGroupAdd}) {
    return (
        <div style={{margin: 'auto'}}>
            <Help helpSteps={NO_GROUPS_HELP_STEPS}/>
            <Button
                onClick={onGroupAdd}
                icon={<AddIcon/>}
                className="scorecard-add-group-button"
                dataTest="scocecard-add-group-button"
                primary
            >
                {i18n.t('Add Group')}
            </Button>
        </div>
    )

}


EmptyDataGroups.propTypes = {
    onGroupAdd: PropTypes.func.isRequired
};
