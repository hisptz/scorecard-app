import i18n from "@dhis2/d2-i18n";
import {findIndex} from "lodash";
import {atom, selector} from "recoil";
import {
    DATA_CONFIGURATION_HELP_STEPS,
    GENERAL_HELP_STEPS
} from "../../../../../core/constants/help/scorecardManagement";
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
        id: "general"
    },
    {
        label: i18n.t("Data Configuration"),
        component: DataConfigurationScorecardForm,
        helpSteps: DATA_CONFIGURATION_HELP_STEPS,
        id: "dataConfiguration"
    },
    {
        label: i18n.t("Highlighted Indicators"),
        component: HighlightedIndicatorsScorecardForm,
        helpSteps: [],
        id: "highlightedIndicators"
    },
    {
        label: i18n.t("Access"),
        component: AccessScorecardForm,
        helpSteps: [],
        id: "access"
    },
    {
        label: i18n.t("Options"),
        component: OptionsScorecardForm,
        helpSteps: [],
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
