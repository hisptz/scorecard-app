import i18n from "@dhis2/d2-i18n";
import { Button, CenteredContent, colors } from "@dhis2/ui";
import ErrorIcon from "@material-ui/icons/Warning";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";

export default function AccessDeniedPage({ accessType }) {
  const history = useHistory();

  const onHomeClick = () => {
    history.replace("/");
  };

  return (
    <div className="column center align-items-center w-100 h-100">
      <CenteredContent>
        <div className="column align-items-center">
          <ErrorIcon
            style={{ color: colors.grey700, fontSize: 64 }}
            fontSize="large"
          />
          <p
            style={{
              color: colors.grey700,
              fontWeight: "bold",
              fontSize: "1vw",
            }}
          >
            {i18n.t("You do not have access to {{accessType}} this Scorecard", {
              accessType,
            })}
          </p>
          <Button primary onClick={onHomeClick}>
            {i18n.t("Back to scorecard list")}
          </Button>
        </div>
      </CenteredContent>
    </div>
  );
}

AccessDeniedPage.propTypes = {
  accessType: PropTypes.oneOf(["edit", "view"]).isRequired,
};
