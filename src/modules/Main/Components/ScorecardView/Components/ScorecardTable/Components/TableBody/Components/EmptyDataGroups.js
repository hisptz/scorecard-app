import i18n from "@dhis2/d2-i18n";
import EmptyIcon from "@material-ui/icons/Inbox";
import React from "react";

export default function EmptyDataGroups() {
  return (
    <div
      className="column center align-items-center"
      style={{ height: "100%" }}
    >
      <EmptyIcon fontSize="large" style={{ color: "#4A5768" }} />
      <h2 style={{ color: "#4A5768" }}>
        {i18n.t("There are no configured indicators for this scorecard")}
      </h2>
    </div>
  );
}
