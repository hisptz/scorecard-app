import i18n from "@dhis2/d2-i18n";
import { colors, IconClock24, IconDimensionOrgUnit16, IconFile24 } from "@dhis2/ui";
import React from "react";

export const LAYOUTS: any = {
	dx: {
		name: "data",
		displayName: i18n.t("Data"),
		icon: <IconFile24 color={colors.grey700} />
	},
	ou: {
		name: "orgUnit",
		displayName: i18n.t("Organisation Unit"),
		icon: <IconDimensionOrgUnit16 color={colors.grey700} />
	},
	pe: {
		name: "period",
		displayName: i18n.t("Period"),
		icon: <IconClock24 color={colors.grey700} />
	}
};

export const DEFAULT_LAYOUT = {
	column: ["dx"],
	row: ["pe"],
	filter: ["ou"]
};
