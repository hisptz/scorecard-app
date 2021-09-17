import i18n from '@dhis2/d2-i18n'

export const SCORECARD_VIEW_HELP_STEPS = [
    {
        intro: i18n.t("This is the default view for your scorecard")
    },
    {
        element: '#org-unit-selector',
        intro: i18n.t("Click here to select different organisation units")
    },
    {
        element: '#period-selector',
        intro: i18n.t("Click here to select different periods")
    },
    {
        element: ".home-button",
        intro: i18n.t("Click here to return to scorecard list")
    },
    {
        element: ".refresh-button",
        intro: i18n.t("Click here to refresh the scorecard page. This will reset organisation units, periods, and options to default values")
    },
    {
        element: ".option-button",
        intro: i18n.t("Click here to customize the scorecard look. Add numbering, enable average rows and columns, hide or show arrows and many more")
    },
    {
        element: '.scorecard-view-edit-button',
        intro: i18n.t("Click here to edit scorecard configuration")
    },
    {
        element: '.download-button',
        intro: i18n.t("Click here to download the scorecard in Excel, PDF, CSV, and JSON formats")
    },
    {
        element: '.scorecard-table',
        intro: i18n.t("Here is the scorecard!")
    }
]
