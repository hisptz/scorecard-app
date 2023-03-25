import i18n from "@dhis2/d2-i18n";
import {
    DATA_CONFIGURATION_HELP_STEPS,
    GENERAL_HELP_STEPS,
    scorecardManagementTooltips
} from "@scorecard/shared";
import {findIndex} from "lodash";
import {atom, selector} from "recoil";
import AccessScorecardForm from "../Components/Access";
import DataConfigurationScorecardForm from "../Components/DataConfiguration";
import GeneralScorecardForm from "../Components/General";
import HighlightedIndicatorsScorecardForm from "../Components/HighlightedIndicators";
import OptionsScorecardForm from "../Components/Options";

export const steps = [
    {
        label: i18n.t("General"),
        component: GeneralScorecardForm,
        helpSteps: GENERAL_HELP_STEPS,
        tooltip: scorecardManagementTooltips[0]['content'],
        id: "general",

    },
    {
        label: i18n.t("Data Configuration"),
        component: DataConfigurationScorecardForm,
        helpSteps: DATA_CONFIGURATION_HELP_STEPS,
        tooltip: scorecardManagementTooltips[1]['content'],
        id: "dataConfiguration"
    },
    {
        label: i18n.t("Highlighted Indicators"),
        component: HighlightedIndicatorsScorecardForm,
        helpSteps: [],
        tooltip: scorecardManagementTooltips[2]['content'],
        id: "highlightedIndicators"
    },
    {
        label: i18n.t("Access"),
        component: AccessScorecardForm,
        helpSteps: [],
        tooltip: scorecardManagementTooltips[3]['content'],
        id: "access"
    },
    {
        label: i18n.t("Options"),
        component: OptionsScorecardForm,
        helpSteps: [],
        tooltip: scorecardManagementTooltips[4]['content'],
        id: "options"
    },
];
export const ActiveStepState = atom({
    key: "activeStepState",
    default: steps[0]
});
export const ActiveStepIndexState = selector({
    key: "activeStepIndexState",
    get: ({get}) => {
        const activeStep = get(ActiveStepState);
        return findIndex(steps, step => step.id === activeStep.id);
    }
});
