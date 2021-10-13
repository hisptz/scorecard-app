import i18n from "@dhis2/d2-i18n";
import { CenteredContent, colors } from "@dhis2/ui";
import { SearchOutlined as SearchIcon } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";

export default function EmptySearchList({ keyword }) {
  return (
    <div className="h-100 w-100">
      <CenteredContent>
        <div className="column center align-items-center">
          <SearchIcon style={{ color: colors.grey700, fontSize: 64 }} />
          <h2 style={{ color: colors.grey700, margin: 8 }}>
            {i18n.t("No scorecards found")}
          </h2>
          <p
            style={{
              color: colors.grey700,
              margin: 4,
            }}
          >
            {i18n.t(`Could not find scorecards matching the keyword `)}
            <b>{`'${keyword}'`}</b>
          </p>
        </div>
      </CenteredContent>
    </div>
  );
}

EmptySearchList.propTypes = {
  keyword: PropTypes.string.isRequired,
};
