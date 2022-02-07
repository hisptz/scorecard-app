import i18n from "@dhis2/d2-i18n";


export const scorecardManagementTooltips = [
    {
        id: "general",
        content: i18n.t("Here you can set your scorecard general information \n" + " You can set name, period type, legends and additional labels of your scorecard."),
    },
    {
        id: "dataConfiguration",
        content: i18n.t("On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table."),
    },
    {
        id: "highlightedIndicators",
        content: i18n.t("In this page you can add and configure highlighted indicators. These indicators appear on top of the scorecard table"),
    },
    {
        id: "access",
        content: i18n.t("In this page you can configure the default organisation unit and sharing access for the scorecard."),
    },
    {
        id: "option",
        content: i18n.t("In this page you can set default options for the scorecard view. These options affect the scorecard view"
        ),
    },
];
