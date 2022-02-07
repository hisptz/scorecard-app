import i18n from "@dhis2/d2-i18n";


export const scorecardManagementTooltips = [
  {
    id: "general",
    content: i18n.t("Here you can modify your scorecard configuration \n"+" You can set name of your scorecard. \n"+"Set the default period type here. This will determine which periods will be selected as defaults\n"," Modify the scorecard header here. You can add different styling, icons, images,and much more\n"+"You have access to Define legends here. Set the title and color"),
  },
  {
    id: "dataConfiguration",
    content: i18n.t("On this page, you can configure different data sources (indicators, dataElements, e.t.c) for the scorecard. You can also preview the scorecard table\n"+"This is the preview area. It shows how your scorecard will look like.\n"+"You can configure different data sources on this area.\n"+"Indicators are configured and displayed in groups\n"+"Double click or click on the edit button to edit the group name\n"+"Click here to expand or collapse the group area\n"),
  },
  {
    id: "highlightedIndicators",
    content: i18n.t("In this page you can add and configure highlighted indicators. These indicators appear on top of the scorecard table\n"+"You can add a highlighted indicator here\n"+"You have access to Click on the row to configure the indicator\n"+"Your can also Click on the remove button to delete the indicator from the list"
    ),
  },
  {
    id: "access",
    content: i18n.t("In this page you can configure the default organisation unit and sharing access\n"+"Choose the default organisation unit from this selector\n"+      "You can add a new user or user group to share the scorecard with here\n"+"Search and select a user or user group here\n"+"You can Select the appropriate access here\n"+"List of shared users and user groups will appear here\n"+"You can edit or delete access here\n"

    ),
  },
  {
    id: "option",
    content: i18n.t( "In this page you can set default options for the scorecard view\n"+"These options affect the scorecard view\n"+"Allows the legends on the scorecard header to be displayed when checked\n"+            "Allows the title on the scorecard header to be displayed when checked\n"+            "Allows row numbers on the scorecard to be displayed when checked\n"+            "Allows the empty rows on the scorecard to be displayed when checked\n"+            "Allows the organisation units hierarchy to be displayed when checked\n"+"Allows the average column to be displayed when checked\n"+"Allows the average row to be displayed when checked\n"+            "Allows the highlighted indicators to be displayed when checked\n"+            "Allows data that is below the overall average to be displayed\n"+            "Allows data that is above the overall average to be displayed\n"+            "Allows increasing or decreasing indicators on data cells to be displayed\n"+            "Changes the table layout, the indicators are shown in rows and orgaunisation units in columns\n"







    ),
  },
];
