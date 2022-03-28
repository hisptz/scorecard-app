import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import PeriodIcon from "@material-ui/icons/AccessTime";
import OrgUnitIcon from "@material-ui/icons/AccountTree";
import DataIcon from "@material-ui/icons/Storage";
import React from "react";

export const LAYOUTS = {
  dx: {
    name: "data",
    displayName: i18n.t("Data"),
    icon: <DataIcon style={{ color: colors.grey700 }} />,
  },
  ou: {
    name: "orgUnit",
    displayName: i18n.t("Organisation Unit"),
    icon: <OrgUnitIcon style={{ color: colors.grey700 }} />,
  },
  pe: {
    name: "period",
    displayName: i18n.t("Period"),
    icon: <PeriodIcon style={{ color: colors.grey700 }} />,
  },
};

export const DEFAULT_LAYOUT = {
  column: ["dx"],
  row: ["pe"],
  filter: ["ou"],
};
