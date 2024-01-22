import i18n from "@dhis2/d2-i18n";
import React from "react";

export const GENERAL_HELP_STEPS = [
  {
    intro: (
      <div style={{ width: 200 }}>
        <h3>{i18n.t("Scorecard Management")}</h3>
        {i18n.t("Here you can modify your scorecard configuration")}
      </div>
    ),
  },
  {
    element: ".general-settings",
    intro: i18n.t("Set your title and subtitle here"),
  },
  {
    element: ".description-settings",
    intro: i18n.t("Describe your scorecard"),
  },
  {
    element: ".period-type-settings",
    intro: i18n.t(
      "Set the default period type here. This will determine which periods will be selected as defaults"
    ),
  },
  {
    element: ".custom-header-settings",
    intro: i18n.t(
      "Modify the scorecard header here. You can add different styling, icons, images,and much more"
    ),
  },
  {
    element: ".legend-definitions-settings",
    intro: i18n.t("Define legends here. Set the title and color"),
  },
  {
    element: ".additional-labels-settings",
    intro: i18n.t("Set additional labels here"),
  },
  {
    element: ".settings-next-button",
    intro: i18n.t("Click on next to move to data configuration page"),
  },
];

export const INTRODUCTION_HELP_STEPS = [
  {
    intro: (
      <div>
        <h3>{i18n.t("Data Configuration")}</h3>
        {i18n.t(
          "On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table."
        )}
      </div>
    ),
  },
];

export const PREVIEW_TABLE_HELP_STEPS = [
  {
    element: ".preview-table-area",
    intro: i18n.t(
      "This is the preview area. It shows how your scorecard will look like."
    ),
  },
];

export const NO_GROUPS_HELP_STEPS = [
  {
    element: ".groups-configuration-area",
    intro: (
      <div>
        <p>
          {i18n.t("You can configure different data sources on this area.")}
        </p>
        <p>{i18n.t("Indicators are configured and displayed in groups")}</p>
      </div>
    ),
  },
  {
      element: ".scorecard-add-group-button",
      intro: i18n.t("Click Here to add a group"),
  },
];

export const GROUPS_CONFIG_HELP_STEPS = [
  {
    element: ".groups-configuration-area",
    intro: (
      <div>
        <p>
          {i18n.t("You can configure different data sources on this area.")}
        </p>
        <p>{i18n.t("Indicators are configured and displayed in groups")}</p>
      </div>
    ),
  },
  {
    element: ".group-name-area",
    intro: i18n.t(
      "Double click or click on the edit button to edit the group name"
    ),
  },
  {
    element: ".expand-group-icon",
    intro: i18n.t("Click here to expand or collapse the group area"),
  },
  {
    element: ".delete-group-icon",
    intro: i18n.t("Click here to delete the group"),
  },
    {
        element: ".scorecard-add-group-button",
        intro: i18n.t("Click Here to add more groups"),
    },
];

export const NO_INDICATORS_HELP_STEPS = [
    {
        element: ".scorecard-indicator-add",
        intro: i18n.t("Click here to add an indicator"),
    },
];

export const INDICATOR_SETUP_HELP_STEPS = [
  {
    element: ".data-holders-area",
    intro: i18n.t("Selected indicators appear here"),
  },
  {
    element: ".data-holder",
    intro: i18n.t(
      "Click here to configure this indicator. You can also drag this to rearrange the indicators within a group"
    ),
  },
  {
    element: ".link-button",
    intro: i18n.t(
      "Click here to link two adjacent indicators or to unlink linked indicators"
    ),
  },
  {
    element: ".data-source.close-icon",
    intro: i18n.t("Click here to delete this indicator"),
  },
    {
        element: ".scorecard-indicator-add",
        intro: i18n.t("Click here to add more indicators"),
    },
];

export const DATA_CONFIGURATION_WITH_DATA_HELP_STEPS = [
  {
    element: ".groups-configuration-area",
    intro: i18n.t("You can configure different data sources on this area"),
  },

  {
    element: ".target-on-level-selector",
    intro: i18n.t(
      "Check this box to set legend configuration according to organisation unit levels"
    ),
  },
    {
        element: ".scorecard-add-group-button",
        intro: i18n.t("Click Here to add a group"),
    },
  ...GROUPS_CONFIG_HELP_STEPS,
  ...INDICATOR_SETUP_HELP_STEPS,
];

export const INDICATOR_CONFIGURATION_STEPS = [
  {
    element: ".data-source-form-container",
    intro: i18n.t("You can edit indicator configuration here"),
  },
  {
    element: 'input[name="label"]',
    intro: i18n.t(
      "Edit indicator label here. This label will displayed on the scorecard table header"
    ),
  },
  {
    element: 'input[name="weight"]',
    intro: i18n.t(
      "You can set the indicator weight here. This is the indicator's maximum value"
    ),
  },
  {
    element: ".effective-gap-settings",
    intro: i18n.t("You can set the effective gap here."),
  },
  {
    element: ".indicator-options-settings-area",
    intro: (
      <div>
        {i18n.t("Here you can set different options for the indicator")}
        <p>
          <b>{i18n.t("Display Arrows")}:</b>
          {i18n.t(
            "Check this to display increasing/decreasing arrows on this indicator's value"
          )}
        </p>
        <p>
          <b>{i18n.t("High is Good")}:</b>
          {i18n.t(
            "Check this to indicate that higher values are good for this indicator  "
          )}
        </p>
        <p>
          <b>{i18n.t("Show Colors")}:</b>
          {i18n.t("Check this to enable legend color on an indicator value ")}
        </p>
      </div>
    ),
  },
  {
    element: ".legend-settings-area",
    intro: i18n.t(
      "Here you can configure the maximum and minimum values for each legend"
    ),
  },
];

export const DATA_CONFIGURATION_HELP_STEPS = [];

export const DATA_CONFIGURATION_STEPS_MAP = {
  introduction: {
    start: 0,
    end: INTRODUCTION_HELP_STEPS.length - 1,
  },
  emptyGroups: {
    start: 1,
    end: NO_GROUPS_HELP_STEPS.length - 1,
  },
  groupConfig: {
    start: NO_GROUPS_HELP_STEPS.length,
    end: GROUPS_CONFIG_HELP_STEPS.length - 1,
  },
  emptyIndicators: {
    start: GROUPS_CONFIG_HELP_STEPS.length,
    end: NO_INDICATORS_HELP_STEPS.length - 1,
  },
  indicatorSetup: {
    start: NO_INDICATORS_HELP_STEPS.length,
    end: INDICATOR_SETUP_HELP_STEPS.length - 1,
  },
  indicatorConfiguration: {
    start: INDICATOR_SETUP_HELP_STEPS.length,
    end: INDICATOR_CONFIGURATION_STEPS.length - 1,
  },
};

export const HIGHLIGHTED_INDICATOR_HELP_STEPS = [
  {
    intro: (
      <div>
        <h3>{i18n.t("Highlighted Indicators")}</h3>
        <p>
          {i18n.t(
            "In this page you can add and configure highlighted indicators. These indicators appear on top of the scorecard table"
          )}
        </p>
      </div>
    ),
  },
  {
    element: ".add-highlighted-indicator-button",
    intro: i18n.t("To add a highlighted indicator click here"),
  },
];

export const HIGHLIGHTED_TABLE_HELP_STEPS = [
  {
    element: ".highlighted-indicator-table",
    intro: i18n.t("Selected indicators will appear here"),
  },
  {
    element: ".highlighted-indicator-row",
    intro: i18n.t("Click on the row to configure the indicator"),
  },
  {
    element: ".highlighted-indicator-delete",
    intro: i18n.t(
      "Click on the remove button to delete the indicator from the list"
    ),
  },
  {
    element: ".add-highlighted-indicator-button",
    intro: i18n.t("To add more highlighted indicators click here"),
  },
];

export const ACCESS_HELP_STEPS = [
  {
    intro: (
      <div>
        <h3>{i18n.t("Access Settings")}</h3>
        <p>
          {i18n.t(
            "In this page you can configure the default organisation unit and sharing access"
          )}
        </p>
      </div>
    ),
  },
  {
    element: ".access-org-unit-filter",
    intro: i18n.t("Choose the default organisation unit from this selector"),
  },
  {
    element: ".add-sharing-access",
    intro: i18n.t(
      "You can add a new user or user group to share the scorecard with here"
    ),
  },
  {
    element: ".user-selector",
    intro: i18n.t("Search and select a user or user group here"),
  },
  {
    element: ".access-selector",
    intro: i18n.t("Select the appropriate access here"),
  },
  {
    element: ".add-access-button",
    intro: i18n.t("Click here to add the access settings"),
  },
  {
    element: ".sharing-list",
    intro: i18n.t("List of shared users and user groups will appear here"),
  },
  {
    element: ".edit-delete-access",
    intro: i18n.t("You can edit or delete access here"),
  },
];

export const OPTIONS_HELP_STEPS = [
  {
    intro: (
      <div>
        <h3>{i18n.t("Default Options Settings")}</h3>
        <p>
          {i18n.t(
            "In this page you can set default options for the scorecard view"
          )}
        </p>
      </div>
    ),
  },
  {
    element: ".visibility-options",
    intro: (
      <div>
        {i18n.t("These options affect the scorecard view")}
        <p>
          <b>{i18n.t("Legend")}:</b>
          {i18n.t(
            "Allows the legends on the scorecard header to be displayed when checked"
          )}
        </p>
        <p>
          <b>{i18n.t("Title")}:</b>
          {i18n.t(
            "Allows the title on the scorecard header to be displayed when checked"
          )}
        </p>
        <p>
          <b>{i18n.t("Item Number")}:</b>
          {i18n.t(
            "Allows row numbers on the scorecard to be displayed when checked"
          )}
        </p>
        <p>
          <b>{i18n.t("Empty Rows")}:</b>
          {i18n.t(
            "Allows the empty rows on the scorecard to be displayed when checked"
          )}
        </p>
        <p>
          <b>{i18n.t("Show Hierarchy")}:</b>
          {i18n.t(
            "Allows the organisation units hierarchy to be displayed when checked"
          )}
        </p>
        <p>
          <b>{i18n.t("Average Column")}:</b>
          {i18n.t("Allows the average column to be displayed when checked")}
        </p>
        <p>
          <b>{i18n.t("Average Row")}:</b>
          {i18n.t("Allows the average row to be displayed when checked")}
        </p>
        <p>
          <b>{i18n.t("Highlighted Indicators")}:</b>
          {i18n.t(
            "Allows the highlighted indicators to be displayed when checked"
          )}
        </p>
      </div>
    ),
  },
  {
    element: ".average-options",
    intro: (
      <div>
        {i18n.t("These options allow to view data based on the average")}
        <p>
          <b>{i18n.t("All")}:</b>
          {i18n.t("Allows all data to be displayed")}
        </p>
        <p>
          <b>{i18n.t("Below Average")}:</b>
          {i18n.t(
            "Allows data that is below the overall average to be displayed"
          )}
        </p>
        <p>
          <b>{i18n.t("Above Average")}:</b>
          {i18n.t(
            "Allows data that is above the overall average to be displayed"
          )}
        </p>
      </div>
    ),
  },
  {
    element: ".other-options",
    intro: (
      <div>
        {/*<p><b>{i18n.t("Score")}:</b>{i18n.t("")}</p> {*/}
        {
          //TODO: Write the explanation for score
        }
        <p>
          <b>{i18n.t("Arrows")}:</b>
          {i18n.t(
            "Allows increasing or decreasing indicators on data cells to be displayed"
          )}
        </p>
        <p>
          <b>{i18n.t("Show Data in Rows")}:</b>
          {i18n.t(
            "Changes the table layout, the indicators are shown in rows and orgaunisation units in columns"
          )}
        </p>
      </div>
    ),
  },
];
