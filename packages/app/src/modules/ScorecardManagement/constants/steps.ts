import i18n from "@dhis2/d2-i18n";
import { ACCESS_HELP_STEPS, DATA_CONFIGURATION_HELP_STEPS, GENERAL_HELP_STEPS, HIGHLIGHTED_INDICATOR_HELP_STEPS, OPTIONS_HELP_STEPS } from "@scorecard/shared";
import DataConfigurationScorecardForm from "../components/DataConfiguration";
import HighlightedIndicatorsScorecardForm from "../components/HighlightedIndicators";
import AccessScorecardForm from "../components/Access";
import OptionsScorecardForm from "../components/Options";
import { JSXElementConstructor, ReactElement } from "react";
import { find, findIndex } from "lodash";
import GeneralForm from "../components/General/components/GeneralForm";


export interface FormStep {
	id: string;
	label: string;
	component: JSXElementConstructor<any>;
	helpSteps: Array<{ intro?: ReactElement | string; element?: string }>;
	tooltip: string;
	fieldIds: string[];
}

export const steps: FormStep[] = [
	{
		label: i18n.t("General"),
		component: GeneralForm,
		helpSteps: GENERAL_HELP_STEPS,
		tooltip: i18n.t(
			"Here you can set your scorecard general information \n" +
			" You can set name, period type, legends and additional labels of your scorecard."
		),
		id: "general",
		fieldIds: [
			"title",
			"subtitle",
			"description",
			"customHeader",
			"additionalLabels",
			"legendDefinitions"
		]as const
	},
	{
		label: i18n.t("Data Configuration"),
		component: DataConfigurationScorecardForm,
		helpSteps: DATA_CONFIGURATION_HELP_STEPS,
		tooltip: i18n.t(
			"On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table."
		),
		id: "dataConfiguration",
		fieldIds: [
			"dataSelection"
		]as const
	},
	{
		label: i18n.t("Highlighted Indicators"),
		component: HighlightedIndicatorsScorecardForm,
		helpSteps: HIGHLIGHTED_INDICATOR_HELP_STEPS,
		tooltip: i18n.t(
			"In this page you can add and configure highlighted indicators. These indicators appear on top of the scorecard table"
		),
		id: "highlightedIndicators",
		fieldIds: [
			"highlightedIndicators"
		]as const
	},
	{
		label: i18n.t("Access"),
		component: AccessScorecardForm,
		helpSteps: ACCESS_HELP_STEPS,
		tooltip: i18n.t(
			"In this page you can configure the default organisation unit and sharing access for the scorecard."
		),
		id: "access",
		fieldIds: [
			"orgUnitSelection"
		]as const
	},
	{
		label: i18n.t("Options"),
		component: OptionsScorecardForm,
		helpSteps: OPTIONS_HELP_STEPS,
		tooltip: i18n.t(
			"In this page you can set default options for the scorecard view. These options affect the scorecard view"
		),
		id: "options",
		fieldIds: [
			"options"
		] as const
	}
] as const;

export function getCurrentStepId(location: { pathname: string }): string {
	return location.pathname.split("/").pop()!;
}

export function getStep(id: string): FormStep {
	return find(steps, ["id", id])!;
}

export function getStepIndex(id: string): number {
	return findIndex(steps, ["id", id])!;
}

export function getAdjacentSteps(id: string): { previous?: FormStep, next?: FormStep } {
	const currentStep = findIndex(steps, ["id", id])!;
	if (currentStep === 0) {
		return {
			next: steps[1]
		};
	}
	if (currentStep === steps.length - 1) {
		return {
			previous: steps[currentStep - 1]
		};
	}

	return {
		previous: steps[currentStep - 1],
		next: steps[currentStep + 1]
	};

}
