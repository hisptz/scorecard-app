import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import React from "react";

export default function EmptyDataGroups({ onGroupAdd }) {
  return (
    <div style={{ margin: "auto" }}>
      <Button
          onClick={onGroupAdd}
          icon={<AddIcon/>}
          className="scorecard-add-group-button"
          dataTest="scorecard-add-group-button"
      >
          {i18n.t("Add Group")}
      </Button>
    </div>
  );
}

EmptyDataGroups.propTypes = {
  onGroupAdd: PropTypes.func.isRequired,
};
