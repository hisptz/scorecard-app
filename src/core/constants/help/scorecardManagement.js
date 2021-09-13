import i18n from '@dhis2/d2-i18n'
import React from 'react'


export const GENERAL_HELP_STEPS = [
    {
        intro: <div style={{width: 200}}>
            <h3>{i18n.t("Scorecard Management")}</h3>
            {i18n.t("Here you can modify your scorecard configuration")}
        </div>
    },
    {
        element: '.general-settings',
        intro: i18n.t("Set your title and subtitle here")
    },
    {
        element: ".description-settings",
        intro: i18n.t("Describe your scorecard")
    },
    {
        element: ".period-type-settings",
        intro: i18n.t("Set the default period type here. This will determine which periods will be selected as defaults")
    },
    {
        element: ".custom-header-settings",
        intro: i18n.t("Modify the scorecard header here. You can add different styling, icons, images,and much more")
    },
    {
        element: ".legend-definitions-settings",
        intro: i18n.t("Define legends here. Set the title and color")
    },
    {
        element: ".additional-labels-settings",
        intro: i18n.t("Set additional labels here")
    },
    {
        element: ".settings-next-button",
        intro: i18n.t("Click on next to move to data configuration page")
    },
]

export const DATA_CONFIGURATION_HELP_STEPS = [
    {
        intro: <div>
            <h3>{i18n.t("Data Configuration")}</h3>
            {i18n.t("On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table.")}
        </div>
    },
    {
        element: ".groups-configuration-area",
        intro: i18n.t("You can configure different data sources on this area")
    },
    {
        element: ".scorecard-add-group-button",
        intro: i18n.t("Click Here to add a group")
    },
]

export const DATA_CONFIGURATION_WITH_DATA_HELP_STEPS = [
    {
        intro: <div>
            <h3>{i18n.t("Data Configuration")}</h3>
            {i18n.t("On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table.")}
        </div>
    },
    {
        element: ".groups-configuration-area",
        intro: i18n.t("You can configure different data sources on this area")
    },
    {
        element: ".preview-table-area",
        intro: i18n.t("This is the preview area. It shows how your scorecard will look like.")
    },
    {
        element: ".target-on-level-selector",
        intro: i18n.t("Check this box to set legend configuration according to organisation unit levels")
    },
    {
        element: ".scorecard-add-group-button",
        intro: i18n.t("Click Here to add a group")
    },
    {
        element: ".group-name-area",
        intro: i18n.t("Double click or click on the edit button to edit the group name")
    },
    {
        element: ".expand-group-icon",
        intro: i18n.t("Click here to expand or collapse the group area")
    },
    {
        element: ".delete-group-icon",
        intro: i18n.t("Click here to delete the group")
    },
    {
        element: ".scorecard-indicator-add",
        intro: i18n.t("Click here to add an indicator")
    },
    {
        element: ".data-holders-area",
        intro: i18n.t("Selected indicators appear here")
    },
    {
        element: ".data-holder",
        intro: i18n.t("Click here to configure this indicator. You can also drag this to rearrange the indicators within a group")
    },
    {
        element: ".link-button",
        intro: i18n.t("Click here to link two adjacent indicators or to unlink linked indicators")
    },
    {
        element: ".data-source.close-icon",
        intro: i18n.t("Click here to delete this indicator")
    },
    {
        element: ".data-source-form-container",
        intro: i18n.t("You can edit indicator configuration here")
    },
    {
        element: 'input[name="label"]',
        intro: i18n.t("Edit indicator label here. This label will displayed on the scorecard table header")
    },
]



