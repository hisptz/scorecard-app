import { colors } from "@dhis2/ui";
import MaterialErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types";
import React from "react";

export default function ErrorIcon({ size, color }) {
  return (
    <MaterialErrorIcon
      style={{
        color: color ?? colors.grey500,
        fontSize: size ?? 24,
      }}
    />
  );
}

ErrorIcon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
};
