import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import React from "react";

export default function EmptyOrgUnitsOrPeriod() {
  return (
    <div className="flex-1 column center align-items-center">
      <h2 style={{ color: colors.grey700 }}>
        {i18n.t("Select Organisation Units and Period to start")}
      </h2>
    </div>
  );
}
