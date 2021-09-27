import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import React from "react";
export default function Instructions() {
  return (
    <div className="col-12" style={{ height: "100%" }}>
      <div className="row center">
        <div className="info-box">
          <div className="column">
            <h2 className="info-box-title">
              {i18n.t("Configure Data Sources")}
            </h2>
            <ul className="info-box-list">
              <li>{i18n.t("Add a data source group")}</li>
              <li>{i18n.t("Modify the group name")}</li>
              <li>{i18n.t("Add different data sources to a group")}</li>
              <li>{i18n.t("Click on a data source to configure it")}</li>
              <li>{i18n.t("View the changes on the preview panel above")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataSourceInstructions() {
  return (
    <div className="col-12" style={{ height: "100%" }}>
      <div className="row center align-items-center">
        <div className="info-box">
          <div className="column">
            <p
              style={{
                fontSize: 18,
                color: colors.grey600,
                fontWeight: "bold",
              }}
            >
              {i18n.t("Select a data source to configure")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
