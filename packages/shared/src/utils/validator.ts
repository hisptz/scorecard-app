import i18n from "@dhis2/d2-i18n";

import { forIn, get, isEmpty } from "lodash";
import {
	accessPageFields,
	dataConfigurationPageFields,
	generalPageFields,
	highlightedIndicatorPageFields,
	optionsPageFields,
	REQUIRED_FIELDS,
} from "../constants";

function validateRequiredFields(scorecard: any, requiredFieldsPath = []) {
	const errors: any = {};
	forIn(scorecard, (value, key) => {
		if (requiredFieldsPath.includes(key) && isEmpty(get(scorecard, key))) {
			errors[`${key}`] = i18n.t("This field is required");
		}
	});
	return errors;
}

export function validateGroups(dataGroups: any = []) {
	const errors: any = {};
	for (const group of dataGroups) {
		if (isEmpty(group.dataHolders)) {
			errors[group.id] = i18n.t(
				"This group does not have any configured data sources",
			);
		}
	}
	return errors;
}

export default function validateScorecard(scorecard: any) {
	return (
		{
			...validateRequiredFields(scorecard, REQUIRED_FIELDS),
			...validateGroups(scorecard?.dataSelection?.dataGroups),
		} ?? {}
	);
}

export function getValidationPageFields(form: any, activePage: any) {
	switch (activePage.id) {
		case "general":
			return generalPageFields;
		case "dataConfiguration":
			return dataConfigurationPageFields;
		case "highlightedIndicator":
			return highlightedIndicatorPageFields;
		case "access":
			return accessPageFields;
		case "options":
			return optionsPageFields;
		default:
			return [];
	}
}
