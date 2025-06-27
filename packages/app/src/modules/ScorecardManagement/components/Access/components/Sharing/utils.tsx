import i18n from "@dhis2/d2-i18n";
import { IconUser24, IconUserGroup24, IconWorld24 } from "@dhis2/ui-icons";
import React from "react";
import { ScorecardAccessType } from "../../../../../../shared";

export function getAccessName(access = "") {
	switch (access) {
		case ScorecardAccessType.NO_ACCESS:
			return i18n.t("No Access");
		case ScorecardAccessType.READ_ONLY:
			return i18n.t("Can Read");
		case ScorecardAccessType.READ_WRITE:
			return i18n.t("Can Read and Write");
	}
}

export function getAccessIcon(type = "") {
	switch (type) {
		case "public":
			return <IconWorld24 />;
		case "user":
			return <IconUser24 />;
		case "userGroup":
			return <IconUserGroup24 />;
	}
}
